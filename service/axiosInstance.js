import axios from 'axios';
import { useRouter } from 'expo-router';
import { Alert, Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

// Determine the base URL based on the platform
const url = Platform.OS === 'web' ? "localhost" : "192.168.1.72";

// Create an instance of Axios
const axiosInstance = axios.create({
    baseURL: `http://192.168.1.72:8080`, // Replace with your API URL
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor
axiosInstance.interceptors.request.use(async req => {
  let jwt;
  if (Platform.OS === 'web') {
    jwt = localStorage.getItem('jwt');
  } else {
    jwt = await SecureStore.getItemAsync('jwt');
  }

  req.headers.Authorization = `Bearer ${jwt}`;

  return req;
}, error => {
  return Promise.reject(error);
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
