import { memes } from "./db";

export const GET = async () => {
  return Response.json(memes);
};
