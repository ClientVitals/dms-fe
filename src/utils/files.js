import axios from "axios";

const API = process.env.REACT_APP_API || 'http://localhost:4000';

export const getRoleFolders = async (role, token) => {
    try {
        const result = await axios.get(`${API}/folders/${role}/files`, {
            headers: {
                Authorization: `Bearer ${token}`, // Attach token in Authorization header
            },
        });

        console.log({result});

        return result?.data;
    } catch(error) {
        throw error;
    }
}

export const uploadToRoleFolder = async (file, role, token, subfolder) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("subfolder", subfolder);

    try {
        const response = await axios.post(`${API}/folders/${role}/upload`, formData, {
            headers: {
                Authorization: `Bearer ${token}`, // Attach token in headers
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data
    } catch (error) {
        throw error;
    }
}