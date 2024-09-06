import axios from "axios";

export const createApiCall = async (config) => {
  // Use axios to make API call
  try {
    const response = await axios({
      method: config.method,
      url: `${import.meta.env.VITE_BACKEND_URL}${config.route}`,
      data: config.data,
      headers: {
        "Content-Type": "application/json",
        ...config.headers, // Allows adding additional custom headers if needed
      },
      withCredentials: config.withCredentials || false, // Add withCredentials support
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error("API Error:", error.response.data);
      console.error("Status:", error.response.status);
      console.error("Headers:", error.response.headers);
    } else if (error.request) {
      // Request was made but no response received
      console.error("API Request Error:", error.request);
    } else {
      // Something happened in setting up the request
      console.error("API Setup Error:", error.message);
    }
    throw error;
  }
};
