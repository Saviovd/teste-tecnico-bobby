<template>
  <div>
    <h1>User List</h1>
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Buscar por nome ou email"
      @input="applyFilter"
    />

    <ul>
      <li v-for="user in paginatedUsers" :key="user.id">
        <UserCard :user="user" :key="user.id" />
      </li>
    </ul>

    <Pagination
      :totalPages="totalPages"
      :currentPage="currentPage"
      @change-page="changePage"
    />
  </div>
</template>

<script>
import UserCard from "./UserCard";
import Pagination from "./ListPagination";
import { applyFilter, sortUsers } from "../utils/search.js";

export default {
  name: "UserList",
  components: {
    UserCard,
    Pagination,
  },
  data() {
    return {
      searchQuery: "",
      filteredUsers: [],
      itemsPerPage: 6,
    };
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
    totalPages() {
      return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    },
    currentPage() {
      return this.$store.state.currentPage;
    },
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredUsers.slice(start, end);
    },
  },
  methods: {
    async fetchUsers() {
      try {
        await this.$store.dispatch("fetchUsers");
        this.applyFilter();
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    },

    applyFilter() {
      this.filteredUsers = sortUsers(
        applyFilter(this.users, this.searchQuery),
        this.searchQuery
      );
    },

    changePage(page) {
      this.$store.commit("SET_CURRENT_PAGE", page);
    },
  },
  watch: {
    users() {
      this.applyFilter();
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>

<style></style>
