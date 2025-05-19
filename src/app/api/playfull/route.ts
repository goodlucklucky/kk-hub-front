import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import axios from "axios";

export async function POST(req: NextRequest) {
  // // Get the session token from the request
  // const token = await getToken({
  //   req,
  //   secret: process.env.API_AUTH_SECRET,
  // });
  // // console.log("-------------\n --- session", token);

  // // If no session token, return unauthorized
  // if (!token)
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const socials = await req.json();

  const abortController = new AbortController();
  req.signal.onabort = () => {
    abortController?.abort?.();
  };

  const url = "https://events.playfull.com/v2/custom-events";
  const clientId = "b06940f1-f3c8-487e-b6c1-9b981a3b8249";
  const clientSecret = "cKveKel3Q7vkKzmpUVJgNUAlIvObOkt8";
  const gameId = "0a423081-2077-46b3-884a-c47b98fe765a";
  const time = new Date();

  const body = { gameId, identifiers: [socials] };

  const ts = time?.getTime();
  const message = `${clientId}${ts}${JSON.stringify(body)}`;

  const signature = crypto
    .createHmac("sha256", clientSecret)
    .update(message)
    .digest("hex");

  const nodeEnv = process.env.NODE_ENV;
  if (nodeEnv === "development") {
    return NextResponse.json({ message: "ok" });
  }

  const res = await axios.post(url, body, {
    headers: {
      "content-type": "application/json",
      "x-client-id": clientId,
      "x-timestamp": ts,
      "x-signature": signature,
      "x-game-id": gameId,
    },
    signal: abortController.signal,
  });

  return NextResponse.json(res?.data);
}
