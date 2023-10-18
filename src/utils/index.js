import { IMG_URL } from "../constants";

const getImg = (photo) => {
  return `${IMG_URL}/${photo}`;
};

export { getImg };
