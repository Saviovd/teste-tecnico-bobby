<template>
  <div>
    <h3 v-if="!isEditing">{{ user.first_name }} {{ user.last_name }}</h3>

    <div v-if="isEditing">
      <input
        type="text"
        v-model="editableUser.first_name"
        placeholder="First Name"
        @blur="validateField('first_name', editableUser.first_name)"
      />
      <span v-if="validationErrors.first_name">{{ validationErrors.first_name }}</span>

      <input
        type="text"
        v-model="editableUser.last_name"
        placeholder="Last Name"
        @blur="validateField('last_name', editableUser.last_name)"
      />
      <span v-if="validationErrors.last_name">{{ validationErrors.last_name }}</span>

      <input
        type="email"
        v-model="editableUser.email"
        placeholder="Email"
        @blur="validateField('email', editableUser.email)"
      />
      <span v-if="validationErrors.email">{{ validationErrors.email }}</span>
    </div>

    <p v-if="!isEditing">{{ user.email }}</p>

    <button @click="toggleEdit">{{ isEditing ? "Salvar" : "Editar" }}</button>
    <button v-if="!isEditing" @click="deleteUser">Excluir</button>
    <button v-else @click="isEditing = false">Cancelar</button>
  
  </div>
</template>

<script>
import { ref } from "vue";
import UserService from "../services/UserService";
import { validateInput } from "../utils/validateForms.js";

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
    const validationErrors = ref({});

    const validateField = (field, value) => {
      const type = {
        first_name: "text",
        last_name: "text",
        email: "email",
      }[field];
      validationErrors.value[field] = validateInput(value, type);
    };

    const toggleEdit = async () => {
      if (isEditing.value) {
        validateField('first_name', editableUser.value.first_name);
        validateField('last_name', editableUser.value.last_name);
        validateField('email', editableUser.value.email);
        
        if (Object.keys(validationErrors.value).some(key => validationErrors.value[key])) {
          return;
        }
        
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
      validationErrors,
      validateField,
      toggleEdit,
      deleteUser,
    };
  },
};
</script>
