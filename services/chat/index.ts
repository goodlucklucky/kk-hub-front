import { GeneralContext } from "@/app/_providers/generalProvider";
import { compress, decompress } from "@/app/_utils/compless";
import { useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export interface message {
  id: string;
  messageText: string;
  sessionId: string;
  updatedAt: Date;
  username: string;
}

export function useChat(sessionId: TSessionId, username: string | null) {
  const [conneectedSocket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<message[]>([]);
  const [newMessage, setNewMessage] = useState<message>();
  const [typing, setTyping] = useState({ isTyping: false, username: "" });
  const { encrypted } = useContext(GeneralContext);

  useEffect(() => {
    console.log("sessionId", sessionId);
    console.log("username", username);
    console.log("encrypted", encrypted);
    
    if (!sessionId || !encrypted) return;

    const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL;
    const newSocket = io(SOCKET_SERVER_URL, {
      path: "/chat",
      query: { sessionId, username },
      extraHeaders: { "x-encrypted-user": encrypted },
    });

    setSocket(newSocket);

    newSocket.on("connect_error", (error) => {
      console.log("Connection error:", error);
      setIsConnected(false);
    });

    newSocket.on("connect", () => {
      setIsConnected(true);
      console.log("Connected to server");
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
      console.log("Disconnected from server");
    });

    newSocket.on("allMessages", async (compressed) => {
      const data = await decompress(compressed);
      setMessages(data);
    });

    newSocket.on("newMessage", async (compressed) => {
      try {
        const data = await decompress(compressed);
        console.log("Here is the new message*******", compressed);
        setNewMessage(data);
        setMessages((prevMessages) => {
          const exists = prevMessages.some((msg) => msg.id === data.id);
          if (!exists) {
            return [...prevMessages, data];
          }
          return prevMessages;
        });
      } catch (error) {
        console.error("Error decompressing newMessage:", error);
      }
    });

    newSocket.on("typing", async (compressed) => {
      const data = await decompress(compressed);
      setTyping({ isTyping: true, username: data.username });
      setTimeout(() => {
        setTyping({ isTyping: false, username: "" });
      }, 2000);
    });

    // Clean up: disconnect the previous socket on change
    return () => {
      newSocket.disconnect();
    };
  }, [sessionId, username, encrypted]);

  const sendMessage = async (event: string, data: any) => {
    if (conneectedSocket) {
      const compressed = await compress(data);
      console.log("Message sent", event);
      conneectedSocket.emit(event, data);
    }
  };

  // const sendMessage = async (event: string, data: any) => {
  //   if (conneectedSocket && isConnected) {
  //     try {
  //       const compressed = await compress(data);
  //       console.log("Message sent (compressed):", compressed);
  //       conneectedSocket.emit(event, data, (ack: any) => {
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
    conneectedSocket,
    isConnected,
  };
}
