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
  async getUsers(page = 1) {
    try {
      const response = await apiClient.get(`/users?page=${page}`);
      return response;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
  createUser(user) {
    return apiClient.post("/users", user);
  },
  editUser(user) {
    console.log(user.id)
    return apiClient.put(`/users/${user.id}`, user);
  },
  deleteUser(userId) {
    return apiClient.delete(`/users/${userId}`);
  },
};
