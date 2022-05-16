import { setS3, getS3 } from "../../../utils";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export const get = async ({
  request,
  params,
}: {
  request: Request;
  params: { name: string };
}) => {
  const name = params.name;

  const authFile = `${name.split("/")[0]}.auth.txt`;
  const dataFile = `${name}.json`;

  // check auth token
  //verify()
  const token = cookie.parse(request.headers.get("cookie")).token;
  let clientId = "";
  try {
    clientId = jwt.verify(token, import.meta.env.JWT_SECRET).clientId;
  } catch {
    return new Response("", { status: 403 });
  }
  // check if owner
  let ok = false;
  try {
    const owner = await getS3(authFile);
    if (owner == clientId) ok = true;
  } catch {
    ok = true;
    await setS3(authFile, clientId);
  }
  if (!ok) {
    return new Response("", { status: 403 });
  }

  // update data
  const data = new URL(request.url).searchParams.get("d");
  await setS3(dataFile, data);
  return new Response("ok");
};
