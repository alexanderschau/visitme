import { Readable } from "stream";
import {
  S3Client,
  GetObjectCommand,
  GetObjectCommandOutput,
} from "@aws-sdk/client-s3";

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

export const getS3 = async (key: string): Promise<string> => {
  const client = new S3Client({
    region: import.meta.env.S3_REGION,
    endpoint: import.meta.env.S3_ENDPOINT,
    credentials: {
      accessKeyId: import.meta.env.S3_ACCESS_KEY,
      secretAccessKey: import.meta.env.S3_SECRET_KEY,
    },
    forcePathStyle: true,
  });

  const cmd = new GetObjectCommand({
    Bucket: import.meta.env.S3_BUCKET_NAME,
    Key: key,
  });

  const resp = (await client.send(cmd)) as GetObjectCommandOutput;
  const text = await streamToString(resp.Body as Readable);

  return text;
};

export const setS3 = async () => {};