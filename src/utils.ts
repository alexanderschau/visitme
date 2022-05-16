import { Readable } from "stream";
import { Client } from "minio";

// Apparently the stream parameter should be of type Readable|ReadableStream|Blob
// The latter 2 don't seem to exist anywhere.
export async function streamToString(stream: Readable): Promise<string> {
  return await new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
  });
}

const getClient = () =>
  new Client({
    endPoint: import.meta.env.S3_ENDPOINT,
    useSSL: true,
    accessKey: import.meta.env.S3_ACCESS_KEY,
    secretKey: import.meta.env.S3_SECRET_KEY,
  });

export const getS3 = async (key: string): Promise<string> => {
  const client = getClient();

  const resp = await client.getObject(import.meta.env.S3_BUCKET_NAME, key);

  return await streamToString(resp);
};

export const setS3 = async (key: string, value: string) => {
  const client = getClient();
  await client.putObject(import.meta.env.S3_BUCKET_NAME, key, value);
};
