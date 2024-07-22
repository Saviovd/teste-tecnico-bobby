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
        ADD_USER(state, user) {
            state.users.push(user);
        },
        EDIT_USER(state, editedUser) {
            const index = state.users.findIndex((user) => user.id === editedUser.id);
            if (index !== -1) {
                state.users.splice(index, 1, editedUser);
            }
        },
        DELETE_USER(state, userId) {
            state.users = state.users.filter((user) => user.id !== userId);
            const totalPages = Math.ceil(state.users.length / 4);
            state.totalPages = totalPages;
            state.currentPage = Math.min(state.currentPage, totalPages);
        },
    },
    actions: {
        async fetchUsers({ commit }) {
            let allUsers = [];
            let totalPages = 0;

            try {
                const firstResponse = await UserService.getUsers(1);
                allUsers = firstResponse.data.data;
                totalPages = firstResponse.data.total_pages;

                for (let page = 2; page <= totalPages; page++) {
                    const response = await UserService.getUsers(page);
                    allUsers = allUsers.concat(response.data.data);
                }

                commit("SET_USERS", allUsers);
                commit("SET_TOTAL_PAGES", totalPages);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        },
        addUser({ commit }, user) {
            UserService.createUser(user)
                .then((response) => {
                    commit("ADD_USER", response.data);
                })
                .catch((error) => {
                    console.error("Error adding user:", error);
                });
        },
        editUser({ commit }, user) {
            UserService.editUser(user)
                .then((response) => {
                    commit("EDIT_USER", response.data);
                })
                .catch((error) => {
                    console.error("Error editing user:", error);
                });
        },
        deleteUser({ commit }, userId) {
            UserService.deleteUser(userId)
                .then(() => {
                    commit("DELETE_USER", userId);
                })
                .catch((error) => {
                    console.error("Error deleting user:", error);
                });
        },
    },
});

export default store;
