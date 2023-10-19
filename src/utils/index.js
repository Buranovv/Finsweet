import { IMG_URL } from "../constants";
import request from "../server";

export const getImg = (photo) => {
  return `${IMG_URL}${photo}`;
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
