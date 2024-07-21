<template>
  <div class="p-6 min-h-screen w-full text-white relative">
    <h2 class="text-4xl mb-4 font-medium text-neutral-300">Controle de Usuários</h2>
    <UserForm />
    <UserList />
  </div>
</template>

<script>
import UserForm from "../components/UserForm.vue";
import UserList from "../components/UserList.vue";

export default {
  components: {
    UserForm,
    UserList,
  },
};
</script>
