import axios from 'axios';
import { useRouter } from 'expo-router'; // Correct import for useRouter from expo-router
import { Alert, Platform } from 'react-native';

// Determine the base URL based on the platform
const url = Platform.OS === 'web' ? "localhost" : "172.18.0.1";

// Create an instance of Axios
const axiosInstance = axios.create({
    baseURL: `http://${url}:8080`, // Replace with your API URL
    headers: {
        'Content-Type': 'application/json',
        "authorization": "Bearer " + localStorage.getItem("jwt")
    }
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      if (error.response.status === 401) {
        // Handle 401 Unauthorized response
        Alert.alert('Unauthorized', 'Please login again.');
        // Redirect to login screen or handle as needed
        const router = useRouter(); // Use the router hook inside the interceptor
        router.push('/login');
      } else {
        Alert.alert('Error', error.response.data.message || 'An error occurred');
      }
    } else if (error.request) {
      Alert.alert('Error', 'No response received from server.');
    } else {
      Alert.alert('Error', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
