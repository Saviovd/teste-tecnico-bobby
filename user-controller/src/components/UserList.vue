<template>
  <div class="p-6 relative bg-gray-900 rounded">
    <div class="flex mb-2 justify-center items-center gap-x-1.5 sm:justify-start">
      <h1 class="text-2xl text-white font-thin mb-2 sm:text-3xl">Search for any user</h1>
      <svg class="w-6 h-6 fill-indigo-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1" id="Capa_1" viewBox="0 0 488.4 488.4" xml:space="preserve">
        <g>
          <path
            d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6    s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2    S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7    S381.9,104.65,381.9,203.25z" />
        </g>
      </svg>
    </div>
    <input v-model="searchQuery" type="text" placeholder="Buscar por nome ou email" @input="applyFilter"
      class="mb-4 p-3 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 w-full mt-10 h-10 sm:mt-0 sm:h-12 sm:w-2/3 md:w-1/2 lg:w-1/3" />
    <button @click="showModal = true"
      class="absolute right-6 mt-0 bg-blue-600 text-white py-1.5 px-2 rounded-lg hover:bg-blue-700 focus:outline-none sm:mt-2 sm:text-md sm:py-1.5 sm:px-2.5 focus:ring-2 focus:ring-blue-500
      text-sm sm:text-sm md:text-lg lg:text-xl">
      Criar Usuário
    </button>
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
import UserForm from "./UserForm.vue"
import { applyFilter, sortUsers } from "../utils/search.js";

export default {
  name: "UserList",
  components: {
    UserCard,
    Pagination,
    Modal,
    UserForm
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
<style>
@media (max-width: 500px) {
  .bg-gray-900 {
    padding: 1.5rem;
  }
  
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
