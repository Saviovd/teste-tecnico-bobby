<template>
    <div class="w-full bg-gray-700 p-4 rounded-sm shadow-lg">
        <h3 class="text-xl mb-2 text-indigo-500">Usuários Ativos vs. Inativos</h3>
        <apexchart class="w-full h-55" type="pie" :options="chartOptions" :series="chartData"></apexchart>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import { activeInactiveChartOptions } from '../services/chartOptions';

export default {
    name: 'ActiveInactiveChart',
    components: {
        apexchart: VueApexCharts,
    },
    setup() {
        const chartOptions = ref(activeInactiveChartOptions);
        const chartData = ref([300, 50]);

        onMounted(() => {
        });

        return {
            chartOptions,
            chartData,
        };
    },
};
</script>