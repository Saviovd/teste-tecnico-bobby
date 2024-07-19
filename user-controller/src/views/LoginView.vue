<!-- src/views/LoginView.vue -->
<template>
  <div>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Senha" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import AuthService from "../services/AuthService";
import { setAuthToken } from "../utils/auth.js";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await AuthService.handleLogin({
          email: this.email,
          password: this.password,
        });
        const token = response.data.token;
        setAuthToken(token);
      } catch (error) {
        console.error("Erro ao fazer login:", error);
      }
    },
  },
};
</script>
