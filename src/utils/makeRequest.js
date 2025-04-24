// eslint-disable-next-line import/no-extraneous-dependencies
import axios from "axios";

// Create axios instance with default config

const makeRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Add request interceptor for adding auth token
makeRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for handling errors
makeRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// API call functions
export const get = async (url, params = {}) => {
  try {
    const response = await makeRequest.get(url, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const post = async (url, data = {}) => {
  try {
    const response = await makeRequest.post(url, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const put = async (url, data = {}) => {
  try {
    const response = await makeRequest.put(url, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const del = async (url) => {
  try {
    const response = await makeRequest.delete(url);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default makeRequest;
