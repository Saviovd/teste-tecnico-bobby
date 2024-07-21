<template>
  <div class="p-6 min-h-screen w-full text-white relative">
    <h2 class="text-4xl mb-4 font-medium text-neutral-300">Controle de Usuários</h2>
    <UserList />
  </div>
</template>

<script>
import UserList from "../components/UserList.vue";

export default {
  components: {
    UserList,
  },
};
</script>
