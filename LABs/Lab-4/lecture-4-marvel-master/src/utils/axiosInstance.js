import axios from "axios";
import qs from "qs";

const apiRoot = "https://gateway.marvel.com:443/v1/public/";
const apiKey = "edcaab04376e3dd7e094ec9c12e7fcdd";
// const url = `${apiRoot}/characters?nameStartsWith=${searchQuery}`;

const instance = axios.create();

// Add a request interceptor
instance.interceptors.request.use(
  function(config) {
    if (config.url.indexOf("?") >= 0) {
      config.url = `${apiRoot}${config.url}&apikey=${apiKey}`;
    } else {
      config.url = `${apiRoot}${config.url}?apikey=${apiKey}`;
    }

    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default instance;
