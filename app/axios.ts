//https://us-central1-homiezfoods.cloudfunctions.net/app

import axios from "axios";

//http://localhost:5001/homiezfoods/us-central1/app
//const BASE_URL = "http://10.0.2.2:5001/homiezfoods/us-central1/app";
const BASE_URL = "https://us-central1-homiezfoods.cloudfunctions.net/app";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

export default instance;
