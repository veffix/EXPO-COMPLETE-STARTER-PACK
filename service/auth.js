import axiosInstance from './axiosInstance';    

export const login = async ({email, password}) => {
    try {
        const response = await axiosInstance.post('/login', { email, password });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
    }
};

export const register = async ({email, password, passwordConfirm}) => {
    try {
        const response = await axiosInstance.post('/signup', { name: 'user', email, password, passwordConfirm, role: 'user' });
        return response.data;
    }
    catch (error) {
        console.error('Error registering:', error);
    }
};