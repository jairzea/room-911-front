import axios from "axios";

const AUTH_TOKEN = `${localStorage.getItem("token_type") || ""} ${
  localStorage.getItem("access_token") || ""
}`;

// eslint-disable-next-line import/prefer-default-export
const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: false, // This is the default
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});

http.defaults.headers.common.Authorization = AUTH_TOKEN;

export default http;
