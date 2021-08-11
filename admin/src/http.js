import axios from "axios";
import Vue from "vue";
import router from "./router";
const http = axios.create({
  baseURL: "http://localhost:3009",
});

// 添加请求拦截器
http.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    if (localStorage.token) {
      config.headers.Authorization = "Bearer " + (localStorage.token || "");
    }

    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.data.message) {
      Vue.prototype.$message({
        type: "error",
        message: err.response.data.message,
      });
      if (err.response.status === 401) {
        router.push("/login");
      }
    }

    // console.log(err.response.data.message);
    //err.response错误返回对象
    return Promise.reject(err);
  }
);
export default http;
