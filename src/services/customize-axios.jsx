import axios from "axios";
const instance = axios.create({
  baseURL: "https://reqres.in",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});
export default instance;

instance.interceptors.response.use(
  function (response) {
    // Do something with response data

    return response.data ? response.data : { statusCode: response.status };
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);
