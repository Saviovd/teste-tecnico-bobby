<template>
  <div>
    <h3>{{ user.name }}</h3>
    <p>{{ user.email }}</p>
    <button @click="$emit('edit', user)">Editar</button>
    <button @click="deleteUser">Excluir</button>
  </div>
</template>

<script>
import UserService from "../services/UserService";

export default {
  props: {
    user: Object,
  },
  setup(props) {
    const deleteUser = async () => {
      try {
        await UserService.deleteUser(props.user.id);
        props.$emit("deleted", props.user.id);
      } catch (error) {
        console.error("Erro ao excluir usuário:", error);
      }
    };

    return {
      deleteUser,
    };
  },
};
</script>
