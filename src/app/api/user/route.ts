import { NextRequest, NextResponse } from "next/server";
import { baseInstance } from "@/../services/axios";

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

  const body = await req.json();
  const initData = (req?.headers?.get("init-data") || "") as string;
  const userData = (req?.headers?.get("x-encrypted-user") || "") as string;

  const abortController = new AbortController();
  req.signal.onabort = () => {
    abortController?.abort?.();
  };

  try {
    const res = await baseInstance.post(
      "/user-service/users/find-or-create-v2",
      body,
      {
        headers: {
          "content-type": "application/json",
          "init-data": initData,
          "x-encrypted-user": userData,
        },
        signal: abortController.signal,
      }
    );

    // console.log("res", res?.data);
    return NextResponse.json(res?.data);
  } catch (error) {
    // console.log("Error in find-or-create-v2", error);
    return NextResponse.json(
      { error: "Error in find-or-create-v2", message: error },
      { status: 500 }
    );
  }
}
