import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000", // API Gateway
});

export default API;
