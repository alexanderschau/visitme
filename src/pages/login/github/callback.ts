import cookie from "cookie";
import jsonwebtoken from "jsonwebtoken";

export const get = async (_, req: Request) => {
  const tokenURL = "https://github.com/login/oauth/access_token";
  const clientId = import.meta.env.GITHUB_CLIENT_ID;
  const secret = import.meta.env.GITHUB_CLIENT_SECRET;

  const code = new URL(req.url).searchParams.get("code");

  const accessToken = (
    await (
      await fetch(tokenURL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: secret,
          code,
        }),
      })
    ).json()
  ).access_token;

  const userId = (
    await (
      await fetch("https://api.github.com/user", {
        headers: {
          accept: "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      })
    ).json()
  ).id as number;

  if (userId == undefined)
    return new Response("", {
      status: 302,
      headers: { location: "/team/login" },
    });

  const exp = new Date(Date.now() + 1000 * 60 * 60);

  const jwt = jsonwebtoken.sign(
    { clientId: `${userId}@github`, exp: exp.getTime() },
    (import.meta.env.JWT_SECRET as string) || ""
  );

  return new Response("", {
    status: 302,
    headers: {
      "set-cookie": cookie.serialize("token", jwt, {
        expires: exp,
        httpOnly: false,
        path: "/",
      }),
      location: "/",
    },
  });
};
