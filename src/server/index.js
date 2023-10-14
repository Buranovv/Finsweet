import axios from "axios";

const request = axios.create({
  baseURL: "https://ap-blog-backend.up.railway.app/api/v1/",
  timeout: 10000,
});

export default request;
