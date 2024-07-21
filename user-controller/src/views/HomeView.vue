<template>
    <div class="p-3 w-full text-white relative text-center sm:p-6 mt-20">
        <div v-if="user" class="mb-4 text-center text-xl text-indigo-200 sm:text-left sm:text-xl">
            <strong class="tracking-wide text-neutral-100 text-xl sm:text-3xl">
                {{ user.first_name }}
            </strong>
            , bom te ver nobvamente!
        </div>
        <h2 class="text-2xl mb-4 mt-6 font-medium text-neutral-300 sm:text-4xl">
            Metricas
        </h2>
        <Dashboard />
    </div>
</template>

<script>
import Dashboard from '../components/Dashboard';

export default {
    name: "HomeView",
    components: {
        Dashboard
    },
    data() {
        return {
            user: null
        };
    },
    created() {
        this.getUserFromLocalStorage();
    },
    methods: {
        getUserFromLocalStorage() {
            const userData = localStorage.getItem('user');
            if (userData) {
                this.user = JSON.parse(userData);
            }
        }
    }
};
</script>
