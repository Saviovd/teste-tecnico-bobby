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
        addUser({ commit }, user) {
            UserService.createUser(user)
                .then((response) => {
                    console.log("User added:", response.data);
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
