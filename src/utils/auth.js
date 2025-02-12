import axios from "axios";

const API = process.env.REACT_APP_API || 'http://localhost:4000';

export const login = async (username, password) => {
    try {
        const result = await axios.post(`${API}/login`, {
            username,
            password
        });

        return result?.data;
    } catch(error) {
        throw error;
    }
}

export const register = async (username, password, role) => {
    try {
        const result = await axios.post(`${API}/register`, {
            username,
            password,
            role
        });

        console.log(result);
    } catch(error) {
        throw error;
    }
}