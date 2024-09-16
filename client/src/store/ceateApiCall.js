import axios from "axios";

const createApiCall = (config) => {
  console.log(config);

  const headers = {
    "Content-Type": "application/json",
    ...config.headers, // Allows adding additional custom headers if needed
  };

  // If an authToken is provided, add it to the Authorization header
  if (config.authToken) {
    headers.Authorization = `Bearer ${config.authToken}`;
  }

  return axios({
    method: config.method,
    url: config.url,
    data: config.data,
    headers, // Updated headers
    withCredentials: config.withCredentials || false, // Add withCredentials support
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
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
    });
};

export default createApiCall;
