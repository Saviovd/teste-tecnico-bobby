<template>
  <div>
    <h2>{{ isEditMode ? 'Editar Usuário' : 'Criar Usuário' }}</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Nome:</label>
        <input type="text" id="name" v-model="user.name" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="user.email" required />
      </div>
      <button type="submit">{{ isEditMode ? 'Salvar' : 'Criar' }}</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import UserService from '../services/UserService';

export default {
  props: {
    userData: Object
  },
  setup(props) {
    const user = ref(props.userData || { name: '', email: '' });
    const isEditMode = ref(!!props.userData);

    const submitForm = async () => {
      try {
        if (isEditMode.value) {
          await UserService.updateUser(user.value);
        } else {
          await UserService.createUser(user.value);
        }
      } catch (error) {
        console.error('Erro ao salvar usuário:', error);
      }
    };

    return {
      user,
      isEditMode,
      submitForm
    };
  }
};
</script>
