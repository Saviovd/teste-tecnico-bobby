<template>
  <div>
    <h1>User List</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.first_name }} {{ user.last_name }} ({{ user.email }})
      </li>
    </ul>
    <div>

      <button
        @click="fetchUsers(currentPage - 1)"
        :disabled="currentPage === 1"
      >
        Previous
      </button>

      <button
        v-for="page in pagesToShow"
        :key="page"
        @click="fetchUsers(page)"
        :class="{ active: page === currentPage }"
      >
        {{ page }}
      </button>

      <button
        @click="fetchUsers(currentPage + 1)"
        :disabled="currentPage >= totalPages"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserList",
  computed: {
    users() {
      return this.$store.state.users;
    },
    totalPages() {
      return this.$store.state.totalPages;
    },
    currentPage() {
      return this.$store.state.currentPage;
    },
    pagesToShow() {
      const pages = [];
      const maxPages = 5;

      let startPage = Math.max(1, this.currentPage - Math.floor(maxPages / 2));
      let endPage = Math.min(this.totalPages, startPage + maxPages - 1);

      if (endPage - startPage < maxPages - 1) {
        startPage = Math.max(1, endPage - maxPages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      return pages;
    },
  },
  methods: {
    async fetchUsers(page = 1) {
      try {
        await this.$store.dispatch("fetchUsers", page);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    },
  },
  created() {
    this.fetchUsers(this.currentPage);
  },
};
</script>

<style>
.active {
  font-weight: bold;
  text-decoration: underline;
}
</style>
