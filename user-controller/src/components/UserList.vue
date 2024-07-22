<template>
  <div class="p-3 relative bg-gray-900 rounded sm:p-6">
    <div
      class="flex flex-col-reverse gap-1.5 justify-end sm:justify-between items-center p-3 pr-0 pl-0 sm:p-6 sm:pr-0 sm:pl-0 bg-gray-900 rounded sm:flex-row ">
      <UserSearch @filter="applyFilter" class="flex-grow" />
      <button @click="showModal = true" class="flex items-center text-right gap-1 bg-blue-600 text-white py-1.5 px-2 rounded-lg hover:bg-blue-700 focus:outline-none text-sm sm:text-md md:text-lg lg:text-xl ml-auto">
        <svg class="h-5 w-5 fill-white" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
          fill="#000000" version="1.1" id="Capa_1" viewBox="0 0 328.5 328.5" xml:space="preserve">
          <g>
            <polygon
              points="96.333,150.918 96.333,135.918 55.667,135.918 55.667,95.251 40.667,95.251 40.667,135.918 0,135.918 0,150.918     40.667,150.918 40.667,191.583 55.667,191.583 55.667,150.918   " />
            <path
              d="M259.383,185.941H145.858c-38.111,0-69.117,31.006-69.117,69.117v39.928H328.5v-39.928    C328.5,216.948,297.494,185.941,259.383,185.941z M313.5,279.987H91.741v-24.928c0-29.84,24.276-54.117,54.117-54.117h113.524    c29.84,0,54.117,24.277,54.117,54.117L313.5,279.987L313.5,279.987z" />
            <path
              d="M202.621,178.84c40.066,0,72.662-32.597,72.662-72.663s-32.596-72.663-72.662-72.663s-72.663,32.596-72.663,72.663    S162.555,178.84,202.621,178.84z M202.621,48.515c31.795,0,57.662,25.867,57.662,57.663s-25.867,57.663-57.662,57.663    c-31.796,0-57.663-25.868-57.663-57.663S170.825,48.515,202.621,48.515z" />
          </g>
        </svg>
        Criar Usuário
      </button>
    </div>
    <ul class="space-y-4">
      <li v-for="user in paginatedUsers" :key="user.id" class="bg-gray-800 p-4 rounded-lg shadow-lg">
        <UserCard :user="user" @deleted="handleDeleteUser" />
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

    handleDeleteUser(userId) {
      this.filteredUsers = this.filteredUsers.filter(user => user.id !== userId);
    },

    updateUser(updatedUser) {
      this.$store.dispatch('editUser', updatedUser);
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
