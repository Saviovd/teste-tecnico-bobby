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
  async getUserByEmail(email) {
    try {
      const pages = await this.fetchAllPages();

      let user = null;

      for (const page of pages) {
        user = page.data.find(user => user.email === email);
        if (user) {
          break; 
        }
      }
      return user;
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      throw error;
    }
  },
  async fetchAllPages() {
    const totalPagesResponse = await this.getUsers(1);
    const totalPages = totalPagesResponse.data.total_pages;

    const pages = [];

    for (let page = 1; page <= totalPages; page++) {
      const response = await apiClient.get(`/users?page=${page}`);
      pages.push(response.data);
    }

    return pages;
  },
  async getUsers(page = 1) {
    try {
      const response = await apiClient.get(`/users?page=${page}`);
      return response;
    } catch (error) {
      return
    }
  },
  createUser(user) {
    return apiClient.post("/users", user);
  },
  editUser(user) {
    return apiClient.put(`/users/${user.id}`, user);
  },
  deleteUser(userId) {
    return apiClient.delete(`/users/${userId}`);
  },
};
