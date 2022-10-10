import client from "./api";

export async function getAllProfileMatchs(config) {
  const response = await client.get("/getAllProfileMatchs", config);
  return response.data;
}

export async function sendMessage(body, config) {
  const response = await client.post("/insertMessage", body, config);
  return response.data;
}

export async function getChatMessages(matchId, config) {
  const response = await client.get(`/getChatMessages/${matchId}`, config);
  return response.data;
}