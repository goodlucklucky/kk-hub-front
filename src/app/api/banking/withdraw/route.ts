import { NextRequest, NextResponse } from "next/server";
import { encryptRequest } from "@/app/_utils/encryption";
import { coinAddresses } from "@/app/_constants/coinAddresses";
import { baseInstance } from "../../../../../services/axios";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
  // Get the session token from the request
  const token = await getToken({
    req,
    secret: process.env.API_AUTH_SECRET,
  });
  // console.log("-------------\n --- session", token, process.env.API_AUTH_SECRET);

  // If no session token, return unauthorized
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const bodyData = await req?.json();

  const abortController = new AbortController();
  req.signal.onabort = () => {
    abortController?.abort?.();
  };

  const url = "/wallet-service/bankings/withdraw-request";
  const contracts = coinAddresses?.[bodyData?.currency as "usdt" | "usdc"];
  const contract_address =
    contracts?.[bodyData?.network as keyof typeof contracts];
  const body = {
    to_address: bodyData?.address,
    sessionId: bodyData?.sessionId,
    chain_id: bodyData?.network,
    contract_address,
    amount: bodyData?.amount,
  };

  const key = process.env.ADD_KEY;
  const initData = (req?.headers?.get("init-data") || "") as string;
  const userData = (req?.headers?.get("x-encrypted-user") || "") as string;
  const payload = encryptRequest(body);

  const res = await baseInstance.post(url, payload, {
    headers: {
      "init-data": initData,
      "x-encrypted-user": userData,
      "x-secret-key": key || "",
    },
    signal: abortController.signal,
  });

  return NextResponse.json(res?.data);
}
