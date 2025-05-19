import { promisify } from "util";
import { deflate, inflate } from "zlib";
import * as msgpack from "msgpack-lite";
import Pako from "pako";

export const deflateAsync = promisify(deflate);
export const inflateAsync = promisify(inflate);

export async function decompress<T = any>(
  compressedBody: ArrayBuffer | any
): Promise<T> {
  if (!(compressedBody instanceof ArrayBuffer)) return compressedBody as T;

  try {
    const decompressedBody = Pako.inflate(compressedBody); // Use pako for decompression
    const body: T = msgpack.decode(new Uint8Array(decompressedBody)); // Decode using msgpack
    return body;
  } catch (error) {
    // console.error("Error decompressing data:", error);
    throw error;
  }
}

export async function compress<T>(body: T) {
  const decompressedBody = msgpack.encode(body);
  const compressedBody = await deflateAsync(decompressedBody);
  return compressedBody;
}
