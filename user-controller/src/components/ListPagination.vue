<template>
  <div class="flex flex-wrap items-center justify-center space-x-2 mt-4">
    <button
      @click="$emit('change-page', currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-3 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-500 transition duration-300 text-sm md:text-base"
    >
      Previous
    </button>

    <button
      v-for="page in pagesToShow"
      :key="page"
      @click="$emit('change-page', page)"
      :class="[
        'px-3 py-2 rounded-lg text-white text-sm md:text-base',
        page === currentPage
          ? 'bg-blue-600 font-semibold'
          : 'bg-gray-700 hover:bg-gray-600'
      ]"
    >
      {{ page }}
    </button>

    <button
      @click="$emit('change-page', currentPage + 1)"
      :disabled="currentPage >= totalPages"
      class="px-3 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-500 transition duration-300 text-sm md:text-base"
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
