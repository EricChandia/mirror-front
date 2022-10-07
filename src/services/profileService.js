import client from "./api";

export async function createProfile(body, config) {
  const response = await client.post("/createProfile", body, config);
  return response.data;
}

export async function profileExists(config) {
  const response = await client.get("/getUserProfile", config);
  if(!response){
    return false;
  }
  return true;
}



export async function getUserProfile(config) {
  const response = await client.get("/getUserProfile", config);
  return response.data;
}

