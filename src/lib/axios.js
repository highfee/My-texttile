import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL || "http://23.88.47.163/dev/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log("API Request:", {
      url: config.url,
      method: config.method,
      data: config.data,
      headers: config.headers,
    });
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("API Response:", {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error("Response error:", {
      url: error.config?.url,
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

// Create a reusable API
const apiClient = {
  async get(url, config) {
    try {
      const response = await axiosInstance.get(url, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async post(url, data, config) {
    try {
      const response = await axiosInstance.post(url, data, config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw {
          message: error.response.data?.message || error.message,
          status: error.response.status,
          data: error.response.data,
        };
      }
      throw {
        message: "Network error occurred",
        status: 500,
        data: null,
      };
    }
  },

  async put(url, data, config) {
    try {
      const response = await axiosInstance.put(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async delete(url, config) {
    try {
      const response = await axiosInstance.delete(url, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  handleError(error) {
    if (axios.isAxiosError(error)) {
      return {
        message: error.response?.data?.message || "An error occurred",
        status: error.response?.status || 500,
        data: error.response?.data,
      };
    }
    return {
      message: "An unexpected error occurred",
      status: 500,
      data: null,
    };
  },
};

export default apiClient;
