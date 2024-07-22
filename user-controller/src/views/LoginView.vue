<template>
  <div class="flex items-center min-h-screen justify-center bg-gradient-to-r from-gray-800 to-indigo-900 p-4">
    <div class="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-white">Login</h2>
      <form @submit.prevent="login" class="space-y-4">
        <div>
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            @blur="validateField('email', email)"
            class="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
          />
          <p v-if="validationErrors.email" class="text-red-400 text-sm mt-1">{{ validationErrors.email }}</p>
        </div>
        <div>
          <input
            v-model="password"
            type="password"
            placeholder="Senha"
            @blur="validateField('password', password)"
            class="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
          />
          <p v-if="validationErrors.password" class="text-red-400 text-sm mt-1">{{ validationErrors.password }}</p>
        </div>
        <button
          type="submit"
          class="w-full py-3 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Login
        </button>
      </form>
      <p class="mt-6 text-white text-sm">
        Para testar o login, use qualquer senha. Você pode buscar um email de usuário na 
        <a href="https://reqres.in/api/users?page=1" target="_blank" class="text-indigo-400 hover:underline">API Reqres</a>.
      </p>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification';
import AuthService from "../services/AuthService";
import { setAuthToken } from "../utils/auth.js";
import { validateInput } from "../utils/validateForms.js";
import UserService from "../services/UserService.js";

export default {
  data() {
    return {
      email: "",
      password: "",
      validationErrors: {},
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
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
        const user = await UserService.getUserByEmail(this.email);
        localStorage.setItem('user', JSON.stringify(user));
        setAuthToken(token);
        this.$router.push("/");
      } catch (error) {
        this.toast.error("O E-mail fornecido não é válido.");
      }
    },
  },
};
</script>
