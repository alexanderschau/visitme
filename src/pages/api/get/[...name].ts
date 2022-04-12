import { getS3 } from "../../../utils";

export const get = async ({ name }) => {
  const text = await getS3(`${name}.json`);
  return new Response(text, {
    headers: {
      "content-type": "application/json",
    },
  });
};
