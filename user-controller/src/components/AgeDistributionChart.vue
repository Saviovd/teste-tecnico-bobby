<template>
    <div class="w-full bg-gray-700 p-4 pb-0 rounded-sm shadow-lg">
        <h3 class="text-xl mb-2 text-indigo-500">Distribuição por Idade</h3>
        <apexchart class="w-full h-55" type="bar" :options="chartOptions" :series="chartData"></apexchart>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import { ageDistributionChartOptions } from '../services/chartOptions';

export default {
    name: 'AgeDistributionChart',
    components: {
        apexchart: VueApexCharts,
    },
    setup() {
        const chartOptions = ref(ageDistributionChartOptions);
        const chartData = ref([
            {
                name: 'Usuários',
                data: [10, 30, 40, 20, 10, 5],
            },
        ]);

        onMounted(() => { });

        return {
            chartOptions,
            chartData,
        };
    },
};
</script>