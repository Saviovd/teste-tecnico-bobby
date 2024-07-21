<template>
  <div class="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
    <img
      class="w-24 h-24 rounded-full border-2 border-gray-700 mb-4 sm:mb-0"
      :src="user.avatar"
      :alt="user.first_name"
    />

    <div class="flex-1">
      <h3 v-if="!isEditing" class="text-xl font-semibold text-white">{{ user.first_name }} {{ user.last_name }}</h3>

      <div v-if="isEditing">
        <input
          type="text"
          v-model="editableUser.first_name"
          placeholder="First Name"
          @blur="validateField('first_name', editableUser.first_name)"
          class="w-full mb-2 p-2 border border-gray-600 rounded bg-gray-900 text-white placeholder-gray-400"
        />
        <span v-if="validationErrors.first_name" class="text-red-500 text-sm">{{ validationErrors.first_name }}</span>

        <input
          type="text"
          v-model="editableUser.last_name"
          placeholder="Last Name"
          @blur="validateField('last_name', editableUser.last_name)"
          class="w-full mb-2 p-2 border border-gray-600 rounded bg-gray-900 text-white placeholder-gray-400"
        />
        <span v-if="validationErrors.last_name" class="text-red-500 text-sm">{{ validationErrors.last_name }}</span>

        <input
          type="email"
          v-model="editableUser.email"
          placeholder="Email"
          @blur="validateField('email', editableUser.email)"
          class="w-full mb-2 p-2 border border-gray-600 rounded bg-gray-900 text-white placeholder-gray-400"
        />
        <span v-if="validationErrors.email" class="text-red-500 text-sm">{{ validationErrors.email }}</span>
      </div>

      <p v-if="!isEditing" class="text-gray-400">{{ user.email }}</p>

      <div class="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <button
          @click="toggleEdit"
          class="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-300"
        >
          {{ isEditing ? "Salvar" : "Editar" }}
        </button>
        <button
          v-if="!isEditing"
          @click="deleteUser"
          class="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
        >
          Excluir
        </button>
        <button
          v-else
          @click="isEditing = false"
          class="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-300"
        >
          Cancelar
        </button>
      </div>
    </div>
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
