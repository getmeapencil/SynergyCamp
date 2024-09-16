import axios from "axios";

export const createApiCall = async (config) => {
  try {
    const response = await axios({
      method: config.method,
      url: `${import.meta.env.VITE_BACKEND_URL}${config.route}`,
      data: config.data,
      params: config.query,  // Adding support for query parameters
      headers: {
        "Content-Type": "application/json",
        ...config.headers,
      },
      withCredentials: config.withCredentials || false,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("API Error:", error.response.data);
      console.error("Status:", error.response.status);
      console.error("Headers:", error.response.headers);
    } else if (error.request) {
      console.error("API Request Error:", error.request);
    } else {
      console.error("API Setup Error:", error.message);
    }
    throw error;
  }
};
