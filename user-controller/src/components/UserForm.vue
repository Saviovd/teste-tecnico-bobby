<template>
  <div class="max-w-lg mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold text-white mb-6">Criar Usuário</h2>
    <form @submit.prevent="submitForm" novalidate>
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-300 mb-1">Nome:</label>
        <input type="text" id="name" v-model="user.name" @blur="validateField('name', user.name)"
          class="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Digite o nome" />
        <p v-if="validationErrors.name" class="text-red-500 text-sm mt-1">{{ validationErrors.name }}</p>
      </div>

      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-300 mb-1">Email:</label>
        <input type="email" id="email" v-model="user.email" @blur="validateField('email', user.email)"
          class="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Digite o email" />
        <p v-if="validationErrors.email" class="text-red-500 text-sm mt-1">{{ validationErrors.email }}</p>
      </div>

      <button type="submit"
        class="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
        Enviar
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import UserService from "../services/UserService";
import { validateInput } from "../utils/validateForms.js";

export default {
  props: {
    userData: Object,
  },
  setup(props) {
    const user = ref(props.userData || { name: "", email: "" });
    const validationErrors = ref({});

    const validateField = (field, value) => {
      const type = {
        name: "text",
        email: "email",
      }[field];
      validationErrors.value[field] = validateInput(value, type);
    };

    const validateForm = () => {
      validationErrors.value.name = validateInput(user.value.name, "text");
      validationErrors.value.email = validateInput(user.value.email, "email");
    };

    const submitForm = async () => {
      validateForm();

      if (
        Object.keys(validationErrors.value).some(
          (key) => validationErrors.value[key]
        )
      ) {
        return;
      }

      try {
        await UserService.createUser(user.value);
      } catch (error) {
        console.error("Erro ao salvar usuário:", error);
      }
    };

    return {
      user,
      validationErrors,
      validateField,
      submitForm,
    };
  },
};
</script>
