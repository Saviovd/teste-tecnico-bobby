<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <h2>Dashboard</h2>
    <apexchart
      type="bar"
      :options="chartOptions"
      :series="chartData"
    ></apexchart>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import VueApexCharts from "vue3-apexcharts";
import UserService from "../services/UserService";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  setup() {
    const chartOptions = ref({
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: true,
        },
      },
      xaxis: {
        categories: [],
      },
    });

    const chartData = ref([
      {
        name: "Usuários",
        data: [],
      },
    ]);

    const loadChartData = async () => {
      try {
        const response = await UserService.getUsers();
        const totalPages = response.data.total_pages;
        const allUsers = [];

        for (let page = 1; page <= totalPages; page++) {
          const pageResponse = await UserService.getUsers(page);
          allUsers.push(...pageResponse.data.data);
        }

        chartOptions.value.xaxis.categories = allUsers.map(
          (user) => `${user.first_name} ${user.last_name}`
        );
        chartData.value[0].data = allUsers.map((user) => user.email.length);
      } catch (error) {
        console.error("Error loading chart data:", error);
      }
    };

    onMounted(loadChartData);

    return {
      chartOptions,
      chartData,
    };
  },
};
</script>

<style>
.apexcharts-canvas {
  max-width: 50%;
}
</style>
