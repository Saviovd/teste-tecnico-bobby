import { createStore } from "vuex";
import UserService from "../services/UserService";

const store = createStore({
    state: {
        users: [],
        totalPages: 0,
        currentPage: 1,
    },
    mutations: {
        SET_USERS(state, users) {
            state.users = users;
        },
        SET_TOTAL_PAGES(state, totalPages) {
            state.totalPages = totalPages;
        },
        SET_CURRENT_PAGE(state, page) {
            state.currentPage = page;
        },
    },
    actions: {
        async fetchUsers({ commit }, page = 1) {
            try {
                const response = await UserService.getUsers(page);
                commit("SET_USERS", response.data.data);
                commit("SET_TOTAL_PAGES", response.data.total_pages);
                commit("SET_CURRENT_PAGE", page);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        },
    },
});

export default store;
