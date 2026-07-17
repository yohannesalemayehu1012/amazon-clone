import axios from "axios";

const axiosInstance = axios.create({

   // Deployed Version  of firebase functions
  // baseURL: "http://127.0.0.1:5001/clone-92ca3/us-central1/api",

  // Deployed Version of amazon server on render.com
  baseURL: "https://amazon-api-2xwv.onrender.com",



});

export { axiosInstance };