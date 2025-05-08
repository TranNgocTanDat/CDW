import axios from "axios";
import type { AxiosRequestConfig } from "axios";

const DOMAIN = "http://localhost:8080/api";

const request = axios.create({
  proxy: false,
  baseURL: DOMAIN,
});

export default {
  async get<T>(endpoint: string, option?: AxiosRequestConfig): Promise<T> {
    return await request.get(endpoint, option);
  },
  async post<T>(endpoint: string, data?: any, option?: AxiosRequestConfig): Promise<T> {
    return await request.post(endpoint, data, option);
  },
  async put<T>(endpoint: string, data?: any, option?: AxiosRequestConfig): Promise<T> {
    return await request.put(endpoint, data, option);
  },
  async delete<T>(endpoint: string, option?: AxiosRequestConfig): Promise<T> {
    return await request.delete(endpoint, option);
  },
  setDefaultHeader(key: string, data?: string) {
    request.defaults.headers.common[key] = data;
    console.log(`Set header: ${key} = ${data}`);
  },
};
