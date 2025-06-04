import { GeneralContext } from "@/app/_providers/generalProvider";
import { compress, decompress } from "@/app/_utils/compless";
import { useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export interface IMessage {
  id: string;
  messageText: string;
  sessionId: string;
  updatedAt: Date;
  username: string;
}

export function useChat(sessionId: TSessionId, username: string | null) {
  const [connectedSocket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(true);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState<IMessage>();
  const [typing, setTyping] = useState({ isTyping: false, username: "" });
  const { encrypted } = useContext(GeneralContext);
  const [hasIncrypted, setHasEncrypted] = useState(false);

  const addMessage = useCallback((message: IMessage) => {
    setMessages((prevMessages) => {
      const exists = prevMessages.some((msg) => msg?.id === message?.id);
      if (!exists) return [...prevMessages, message];

      return prevMessages;
    });
  }, []);

  useEffect(() => {
    if (!encrypted) return;

    setHasEncrypted(true);
  }, [encrypted]);

  useEffect(() => {
    if (!sessionId || !hasIncrypted) return;

    const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL;
    const newSocket = io(SOCKET_SERVER_URL, {
      path: "/chat",
      query: { sessionId, username },
      extraHeaders: { "x-encrypted-user": encrypted! },
    });

    setSocket(newSocket);

    newSocket.on("connect_error", (error) => {
      setIsConnected(false);
      console.log("Connection error:", error);
    });

    newSocket.on("connect", () => {
      setIsConnected(true);
      console.log("Connected to server");
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
      console.log("Disconnected from server");
    });

    // Clean up: disconnect the previous socket on change
    return () => {
      console.log("my disconnect");
      newSocket.disconnect();
    };
  }, [sessionId, username, hasIncrypted]);

  useEffect(() => {
    // console.log("isConnected", isConnected);

    if (isConnected) return;

    const reconnectTimeout = setTimeout(() => {
      if (isConnected) return;

      // console.log("Reconnecting...");
      connectedSocket?.connect();
    }, 3000);

    return () => clearTimeout(reconnectTimeout);
  }, [isConnected, connectedSocket]);

  useEffect(() => {
    connectedSocket?.on("allMessages", async (compressed) => {
      const data = await decompress(compressed);
      setMessages(data);
    });

    connectedSocket?.on("newMessage", async (compressed) => {
      try {
        const data: IMessage = await decompress(compressed);
        // console.log("Here is the new message*******", compressed);
        setNewMessage(data);

        if (data?.sessionId !== sessionId) addMessage(data);
      } catch (error) {
        // console.error("Error decompressing newMessage:", error);
      }
    });

    connectedSocket?.on("typing", async (compressed) => {
      const data = await decompress(compressed);
      setTyping({ isTyping: true, username: data.username });
      setTimeout(() => {
        setTyping({ isTyping: false, username: "" });
      }, 2000);
    });
  }, [connectedSocket, sessionId, addMessage]);

  const sendMessage = async (event: string, data: any) => {
    if (!connectedSocket) return;

    const compressed = await compress(data);
    // console.log("Message sent", event);
    connectedSocket?.emit(event, compressed);

    if (event === "createMessage")
      addMessage({
        ...data,
        id: crypto?.randomUUID(),
        updatedAt: new Date(),
        createdAt: new Date(),
      });
  };

  // const sendMessage = async (event: string, data: any) => {
  //   if (connectedSocket && isConnected) {
  //     try {
  //       const compressed = await compress(data);
  //       console.log("Message sent (compressed):", compressed);
  //       connectedSocket.emit(event, data, (ack: any) => {
  //         console.log("Acknowledgment from server:", ack);
  //       });
  //     } catch (error) {
  //       console.error("Error sending message:", error);
  //     }
  //   } else {
  //     console.error("Socket is not connected");
  //   }
  // };

  return {
    sendMessage,
    messages,
    newMessage,
    typing,
    connectedSocket,
    isConnected,
  };
}
