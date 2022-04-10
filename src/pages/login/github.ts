export const get = () => {
  const clientId = import.meta.env.GITHUB_CLIENT_ID;

  return new Response("redirect to GitHub...", {
    status: 302,
    headers: {
      location: `https://github.com/login/oauth/authorize?client_id=${clientId}`,
    },
  });
};
