import { IMG_URL } from "../constants";
import request from "../server";

export const getUserImg = (photo) => {
  return `${IMG_URL}${photo}`;
};

export const getImg = (photo) => {
  const photoType = photo?.name?.split(".")[1];
  const photoId = photo?._id;
  const realPhoto = `${photoId}.${photoType}`;

  return `${IMG_URL}${realPhoto}`;
};

export const getSingleData = async (url, id) => {
  let name;
  if (url === "post") {
    const { data } = await request.get(`${url}/${id}`);
    name = data?.title;
  } else if (url === "user") {
    const { data } = await request.get(`${url}/${id}`);
    name = data?.username;
  }

  return name;
};
