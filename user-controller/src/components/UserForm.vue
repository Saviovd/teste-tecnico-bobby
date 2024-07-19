<template>
  <div>
    <h2>Criar Usuário</h2>
    <form @submit.prevent="submitForm" novalidate>
      <div>
        <label for="name">Nome:</label>
        <input
          type="text"
          id="name"
          v-model="user.name"
          @blur="validateField('name', user.name)"
        />
        <p v-if="validationErrors.name">{{ validationErrors.name }}</p>
      </div>
      <div>
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="user.email"
          @blur="validateField('email', user.email)"
        />
        <p v-if="validationErrors.email">{{ validationErrors.email }}</p>
      </div>
      <button type="submit">Enviar</button>
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
