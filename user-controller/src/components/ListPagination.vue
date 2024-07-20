<template>
  <div>
    <button
      @click="$emit('change-page', currentPage - 1)"
      :disabled="currentPage === 1"
    >
      Previous
    </button>

    <button
      v-for="page in pagesToShow"
      :key="page"
      @click="$emit('change-page', page)"
      :class="{ active: page === currentPage }"
    >
      {{ page }}
    </button>

    <button
      @click="$emit('change-page', currentPage + 1)"
      :disabled="currentPage >= totalPages"
    >
      Next
    </button>
  </div>
</template>

<script>
export default {
  name: "ListPagination",
  props: {
    totalPages: Number,
    currentPage: Number,
  },
  computed: {
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
};
</script>

<style>
.active {
  font-weight: bold;
  text-decoration: underline;
}
</style>
