import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  // Get the session token from the request
  const token = await getToken({
    req,
    secret: process.env.API_AUTH_SECRET,
  });
  // console.log("-------------\n --- session", token);

  // If no session token, return unauthorized
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  return NextResponse.json({
    message: "Valid Telegram user",
    // user: session.user,
  });
}
