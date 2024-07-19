<template>
    <div>
        <h1>Controle de Usuários</h1>
        <router-link to="/users">Gerenciar Usuários</router-link>
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
