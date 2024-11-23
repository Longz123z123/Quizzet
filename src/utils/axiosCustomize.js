import axios from 'axios';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { store } from '../redux/store';

nProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
});
//Thư viện Axios trong React được sử dụng để thực hiện các yêu cầu HTTP (HyperText Transfer Protocol) đến các API (Application Programming Interface).
// Nói cách khác, nó giúp bạn giao tiếp với các server khác để lấy hoặc gửi dữ liệu.

const instance = axios.create({
  baseURL: 'http://localhost:8081/',
});
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    const access_token = store?.getState()?.user?.account?.access_token;
    config.headers['Authorization'] = 'Bearer ' + access_token;
    nProgress.start();

    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    nProgress.done();
    // console.log("Check interceptors res>>", response)
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
  },
  function (error) {
    nProgress.done();
    //token expired: EC === -999
    // if (error.response.data && error.response.data.EC === -999) {
    //   window.location.href = '/login';
    // }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // console.log(">>>run erro", error.response);
    return error & error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);
export default instance;
