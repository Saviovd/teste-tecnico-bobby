<template>
  <div>
    <form @submit.prevent="login">
      <div>
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          @blur="validateField('email', email)"
        />
        <p v-if="validationErrors.email">{{ validationErrors.email }}</p>
      </div>
      <div>
        <input
          v-model="password"
          type="password"
          placeholder="Senha"
          @blur="validateField('password', password)"
        />
        <p v-if="validationErrors.password">{{ validationErrors.password }}</p>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import AuthService from "../services/AuthService";
import { setAuthToken } from "../utils/auth.js";
import { validateInput } from "../utils/validateForms.js";

export default {
  data() {
    return {
      email: "",
      password: "",
      validationErrors: {},
    };
  },
  methods: {
    validateField(field, value) {
      const type = {
        email: "email",
        password: "password",
      }[field];
      this.validationErrors[field] = validateInput(value, type);
    },

    validateForm() {
      this.validationErrors.email = validateInput(this.email, "email");
      this.validationErrors.password = validateInput(this.password, "password");
    },

    async login() {
      this.validateForm();

      if (
        Object.keys(this.validationErrors).some(
          (key) => this.validationErrors[key]
        )
      ) {
        return;
      }

      try {
        const response = await AuthService.handleLogin({
          email: this.email,
          password: this.password,
        });
        const token = response.data.token;
        setAuthToken(token);
        this.$router.push('/');
      } catch (error) {
        console.error("Erro ao fazer login:", error);
      }
    },
  },
};
</script>
