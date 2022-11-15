import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:9000/api",
  timeout: 3000,
});

/* 假设这是支付服务的请求实例配置 */
// export const paymentInstance = axios.create({
//     baseURL:"http://alipay.com/api",
//     timeout:3000,
//     headers:{
//         "X-Host":"alipay.com"
//     }
// })

/* 请求拦截器：统一添加鉴权token */
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    config.headers["Authorization"] = `Bearer tokenvalue`;
    return config;
  },

  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

/* 响应拦截器：从响应中过滤出服务器返回的数据 */
instance.interceptors.response.use(
  function (res) {
    return res.data;
  },

  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

export default instance;
