import { NextRequest, NextResponse } from "next/server";
import { baseInstance } from "@/../services/axios";
import { encryptRequest } from "@/app/_utils/encryption";

export async function POST(req: NextRequest) {
  try {
    const body = await req?.json();
    const key = process.env.ADD_KEY;

    const abortController = new AbortController();
    req.signal.onabort = () => {
      abortController.abort();
    };

    const initData = (req?.headers?.get("init-data") || "") as string;
    const userData = (req?.headers?.get("x-encrypted-user") || "") as string;

    const { payment_item_type, ...restBody } = body || {};
    const newBody = {
      ...restBody,
      purchase_details: {
        purchased_at: new Date().toISOString(),
        payment_method: `${restBody?.payment_method || "in-app"} payment`,
      },
    };

    const secret = process.env.SCORE_ENCRYPTION_KEY;
    const encryptedPayload = encryptRequest(newBody, secret);

    // console.log(
    //   "Encrypted Payload:",
    //   JSON.stringify(encryptedPayload, null, 2)
    // );

    // buy store item
    const data = await baseInstance
      .post(`/nft-service/store/user-items/check-buy`, encryptedPayload, {
        headers: {
          "init-data": initData,
          "x-encrypted-user": userData,
          "x-secret-key": key || "",
        },
        signal: abortController.signal,
      })
      .then((res) => res.data);

    // console.log(data);

    return NextResponse.json(data);
  } catch (error: any) {
    if (error?.name === "AbortError" || error?.code === "ERR_CANCELED") {
      // console.log("Request was aborted by the client");
      return NextResponse.json(
        { error: "Request aborted by the client" },
        { status: 499 }
      );
    }

    // console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
