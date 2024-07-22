import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://reqres.in/api",
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

export default {
    async handleLogin(userData) {
        try {
            const response = await apiClient.post(`/login`, userData);
            return response;
        } catch (error) {
            return
        }
    },
}