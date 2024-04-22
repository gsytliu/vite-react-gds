import axios, { type AxiosRequestConfig } from 'axios';
import { router } from '@/router';

const _axios = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});

_axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

_axios.interceptors.response.use(
  (res) => {
    const { data } = res.data;
    return data;
  },
  (err) => {
    router.navigate('/login');
    return Promise.reject(err);
  },
);

export default _axios as unknown as <T = any>(
  arg: AxiosRequestConfig,
) => Promise<T>;
