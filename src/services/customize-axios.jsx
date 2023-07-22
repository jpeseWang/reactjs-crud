import axios from "axios";
const instance = axios.create({
  baseURL: "https://reqres.in",
  headers: { "X-Custom-Header": "foobar" },
});
export default instance;

instance.interceptors.response.use(
  function (response) {
    // Do something with response data

    return response.data ? response.data : { statusCode: response.status };
  },
  function (error) {
    let res = {};
    if (error.response) {
      res.data = error.response.data;
      res.status = error.response.status;
      res.headers = error.response.headers;
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log(error.message);
    }
    return res;
    // Do something with response error
    // return Promise.reject(error);
  }
);
