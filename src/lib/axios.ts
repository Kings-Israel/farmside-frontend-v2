import axios from "axios";

export const http = axios.create({
  baseURL:
    process.env.NODE_ENV == "development"
      ? "http://farmside.test/api"
      : "https://farmside-admin.kingsisrael.com/api",
});
