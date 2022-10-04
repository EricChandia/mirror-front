import client from "./api";

export async function signin(body) {
  const response = await client.post("/signin", body);
  return response.data;
}

export async function signup(body) {
  const response = await client.post("/signup", body);
  return response.data;
}
