<template>
  <div>
    <h3 v-if="!isEditing">{{ user.first_name }} {{ user.last_name }}</h3>

    <div v-if="isEditing">
      <input
        type="text"
        v-model="editableUser.first_name"
        placeholder="First Name"
      />
      <input
        type="text"
        v-model="editableUser.last_name"
        placeholder="Last Name"
      />
    </div>

    <p v-if="!isEditing">{{ user.email }}</p>
    <input v-if="isEditing" type="email" v-model="editableUser.email" />

    <button @click="toggleEdit">{{ isEditing ? "Salvar" : "Editar" }}</button>
    <button @click="deleteUser">Excluir</button>
  </div>
</template>

<script>
import { ref } from "vue";
import UserService from "../services/UserService";

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const isEditing = ref(false);
    const editableUser = ref({ ...props.user });

    const toggleEdit = async () => {
      if (isEditing.value) {
        try {
          await UserService.editUser(editableUser.value);
          emit("updated", editableUser.value);
        } catch (error) {
          console.error("Erro ao editar usuário:", error);
        }
      }
      isEditing.value = !isEditing.value;
    };

    const deleteUser = async () => {
      try {
        await UserService.deleteUser(props.user.id);
        emit("deleted", props.user.id);
      } catch (error) {
        console.error("Erro ao excluir usuário:", error);
      }
    };

    return {
      isEditing,
      editableUser,
      toggleEdit,
      deleteUser,
    };
  },
};
</script>
