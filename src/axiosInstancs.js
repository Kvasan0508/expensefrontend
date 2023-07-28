import axios from "axios";
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: "https://03sxynnn7l.execute-api.us-east-1.amazonaws.com/prod/api/v1/", // Your API base URL
});

axiosInstance.interceptors.response.use(
  (response) => {
    // Check if the response contains a token in the data
    const responseData = response.data;
    if (responseData.success && responseData.token) {
      // Save the token in a cookie
      Cookies.set('token', responseData.token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expiry of 7 days from now
      });
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add an interceptor to include the bearer token in the request headers
axiosInstance.interceptors.request.use((config) => {
  const authToken = Cookies.get('token');
  if (authToken) {
    config.headers["Authorization"] = `Bearer ${authToken}`;
  }
  return config;
});

export default axiosInstance;
