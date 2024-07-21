<template>
    <div class="p-3 min-h-screen w-full text-white relative text-center sm:p-6">
        <h2 class="text-2xl mb-4 mt-20 font-medium text-neutral-300 sm:text-4xl sm:mt-14 ">
            Metricas
        </h2>
        <Dashboard />
    </div>
</template>

<script>
import Dashboard from '../components/Dashboard'
export default {
    name: "HomeView",

    components: {
        Dashboard
    }
};
</script>
