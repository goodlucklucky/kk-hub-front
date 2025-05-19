import * as CryptoJS from "crypto-js";

const SECRET_KEY =
  process.env.NEXT_PUBLIC_ENCRYPTION_KEY ||
  "this-should-be-a-strong-secret-key";

export const encryptRequest = (data: any, key: string = SECRET_KEY) => {
  try {
    const payload = {
      ...data,
      _timestamp: Date.now(),
      _nonce:
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15),
    };

    // Create a unique key based on time
    const timestamp = Date.now();
    const minuteTimestamp = Math.floor(timestamp / (60 * 1000));
    const dynamicKey = CryptoJS.SHA256(`${key}:${minuteTimestamp}`).toString();

    // Stringify the payload
    const jsonString = JSON.stringify(payload);

    // Encrypt with AES
    const encrypted = CryptoJS.AES.encrypt(jsonString, dynamicKey).toString();

    // Generate a signature
    const signature = CryptoJS.HmacSHA256(encrypted, dynamicKey).toString();

    return {
      encryptedData: encrypted,
      timestamp,
      signature,
      meta: {
        v: "1.2.3",
        s: Math.floor(Math.random() * 1000),
        r: btoa(Math.random().toString()).substring(10, 15),
      },
    };
  } catch {
    // console.error("Encryption error:", error);
    // console.warn("Failed to encrypt, sending unencrypted data");
    return data;
  }
};

// For testing - allow decrypting on frontend
export const decryptResponse = (encryptedData: string, timestamp: number) => {
  try {
    const minuteTimestamp = Math.floor(timestamp / (60 * 1000));
    const dynamicKey = CryptoJS.SHA256(
      `${SECRET_KEY}:${minuteTimestamp}`
    ).toString();

    const bytes = CryptoJS.AES.decrypt(encryptedData, dynamicKey);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

    return JSON.parse(decryptedString);
  } catch {
    // console.error("Decryption error:", error);
    return null;
  }
};
