import client from "./api";

export async function find10Profiles(config) {
  const response = await client.get("/find10Profiles",  config);
  return response.data;
}



export async function dislike(whoReceivedid, config) {
  const response = await client.post(`/dislikeProfile/${whoReceivedid}`, {}, config);
  return response.data;
}




export async function like(whoReceivedid, config) {
  const response = await client.post(`/likeProfile/${whoReceivedid}`, {}, config);
  return response.data;
}


