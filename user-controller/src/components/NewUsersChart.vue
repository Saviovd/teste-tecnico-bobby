<template>
    <div class="w-full bg-gray-700 p-4 pb-0 rounded-lg shadow-lg">
        <h3 class="text-xl mb-2 text-neutral-200">Novos Usuários por Mês</h3>
        <apexchart class="w-full h-55" type="line" :options="chartOptions" :series="chartData"></apexchart>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import { newUsersChartOptions } from '../services/chartOptions';

export default {
    name: 'NewUsersChart',
    components: {
        apexchart: VueApexCharts,
    },
    setup() {
        const chartOptions = ref(newUsersChartOptions);
        const chartData = ref([
            {
                name: 'Novos Usuários',
                data: [30, 40, 45, 50, 49, 60, 70, 91, 125, 140, 160, 180],
            },
        ]);

        onMounted(() => {});
        return {
            chartOptions,
            chartData,
        };
    },
};
</script>