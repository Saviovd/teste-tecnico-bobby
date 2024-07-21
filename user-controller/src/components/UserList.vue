<template>
  <div class="p-3 relative bg-gray-900 rounded sm:p-6">
    <div class="flex justify-between items-center p-3 pr-0 pl-0 sm:p-6 sm:pr-0 sm:pl-0 bg-gray-900 rounded">
      <UserSearch @filter="applyFilter" class="flex-grow mr-4" />
      <button @click="showModal = true" class="bg-blue-600 text-white py-1.5 px-2 rounded-lg hover:bg-blue-700 focus:outline-none text-sm sm:text-md md:text-lg lg:text-xl
      focus:ring-2 focus:ring-blue-500">
        Criar Usuário
      </button>
    </div>
    <ul class="space-y-4">
      <li v-for="user in paginatedUsers" :key="user.id" class="bg-gray-800 p-4 rounded-lg shadow-lg">
        <UserCard :user="user" />
      </li>
    </ul>

    <Pagination :totalPages="totalPages" :currentPage="currentPage" @change-page="changePage" class="mt-6" />

    <Modal :visible="showModal" @close="showModal = false">
      <UserForm />
    </Modal>
  </div>
</template>

<script>
import UserCard from "./UserCard";
import Pagination from "./ListPagination";
import Modal from "./Modal";
import UserSearch from '../components/UserSearch';
import UserForm from "./UserForm.vue";
import { applyFilter, sortUsers } from "../utils/search.js";

export default {
  name: "UserList",
  components: {
    UserCard,
    Pagination,
    Modal,
    UserForm,
    UserSearch
  },
  data() {
    return {
      searchQuery: "",
      filteredUsers: [],
      itemsPerPage: 4,
      showModal: false
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

    applyFilter(searchQuery) {
      this.filteredUsers = sortUsers(
        applyFilter(this.users, searchQuery),
        searchQuery
      );
    },

    changePage(page) {
      this.$store.commit("SET_CURRENT_PAGE", page);
    },
  },
  watch: {
    users() {
      this.applyFilter(this.searchQuery);
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
@media (max-width: 500px) {
  .text-2xl {
    font-size: 1.5rem;
  }
  
  .text-sm {
    font-size: 0.875rem;
  }
  
  .mt-6 {
    margin-top: 1.5rem;
  }
  
  .mb-2 {
    margin-bottom: 0.5rem;
  }
  
  .mb-4 {
    margin-bottom: 1rem;
  }
}
</style>
