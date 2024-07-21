<template>
  <div class="p-3 min-h-screen w-full text-white relative sm:p-6">
    <h2 class="text-2xl mb-4 mt-20 font-medium text-neutral-300 sm:text-4xl sm:mt-10 ">
      Controle de Usuários
    </h2>
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
