import client from "./api";

export async function uploadPhoto(formData, config) {
  const response = await client.post("/uploadPhoto", formData, config);
  return response.data;
}

export async function getProfilePhotos(config) {
  const response = await client.post("/getProfilePhotos", config);
  return response.data;
}
