import axios, { AxiosRequestConfig } from 'axios';

export const fetchData = async (url: string, config?: AxiosRequestConfig) => {
  try {
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch data from ${url}: ${error.message}`);
  }
};

export const postData = async (
  url: string,
  data: any,
  config?: AxiosRequestConfig,
) => {
  try {
    const response = await axios.post(url, data, config);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to post data to ${url}: ${error.message}`);
  }
};
