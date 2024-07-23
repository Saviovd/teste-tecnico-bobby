<template>
  <div
    class="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
    <img class="w-24 h-24 rounded-full border-2 border-gray-700 mb-0" :src="editableUser.avatar"
      :alt="editableUser.first_name" />

    <div class="flex-1">
      <h3 v-if="!isEditing" class="text-xl font-semibold text-center mt-0 sm:text-left sm:mt-4 text-white">{{ editableUser.first_name }} {{
        editableUser.last_name }}</h3>

      <div v-if="isEditing">
        <input type="text" v-model="editableUser.first_name" placeholder="First Name"
          @blur="validateField('first_name', editableUser.first_name)"
          :class="['w-full mb-2 p-2 rounded bg-gray-900 text-white placeholder-gray-400', validationErrors.first_name ? 'border-red-500 placeholder-red-400 border' : 'border-gray-600 border']" />
        <span v-if="validationErrors.first_name" class="text-red-500 text-sm">{{ validationErrors.first_name }}</span>

        <input type="text" v-model="editableUser.last_name" placeholder="Last Name"
          @blur="validateField('last_name', editableUser.last_name)"
          :class="['w-full mb-2 p-2 rounded bg-gray-900 text-white placeholder-gray-400', validationErrors.last_name ? 'border-red-500 placeholder-red-400 border' : 'border-gray-600 border']" />
        <span v-if="validationErrors.last_name" class="text-red-500 text-sm">{{ validationErrors.last_name }}</span>

        <input type="email" v-model="editableUser.email" placeholder="Email"
          @blur="validateField('email', editableUser.email)"
          :class="['w-full mb-2 p-2 rounded bg-gray-900 text-white placeholder-gray-400', validationErrors.email ? 'border-red-500 placeholder-red-400 border' : 'border-gray-600 border']" />
        <span v-if="validationErrors.email" class="text-red-500 text-sm ">{{ validationErrors.email }}</span>
      </div>

      <p v-if="!isEditing" class="text-gray-400">{{ editableUser.email }}</p>

      <div class="flex justify-center items-center flex-row sm:justify-end mt-3 sm:mt-2 md:mt-5 lg:mt-0 space-y-0 space-x-2">
        <button @click="toggleEdit"
          class="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-300">
          {{ isEditing ? "Salvar" : "Editar" }}
        </button>
        <button v-if="!isEditing" @click="showConfirmationModal = true"
          class="bg-red-600 text-white py-2 px-4 m-0 rounded hover:bg-red-700 transition duration-300">
          Excluir
        </button>
        <button v-else @click="cancelEdit"
          class="bg-gray-600 text-white m-0 py-2 px-4 rounded hover:bg-gray-700 transition duration-300">
          Cancelar
        </button>
      </div>
    </div>

    <ConfirmationModal :visible="showConfirmationModal"
      message="Você tem certeza que deseja excluir este usuário?" @confirm="deleteUser"
      @cancel="showConfirmationModal = false" />
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useToast } from 'vue-toastification';
import UserService from '../services/UserService';
import { validateInput } from '../utils/validateForms.js';
import ConfirmationModal from './ConfirmationModal.vue';

export default {
  components: {
    ConfirmationModal,
  },
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
    const toast = useToast();
    const showConfirmationModal = ref(false);

    watch(() => props.user, (newUser) => {
      editableUser.value = { ...newUser };
    });

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
          emit('updated', editableUser.value);
          toast.success("Usuário atualizado com sucesso!");
        } catch (error) {
          console.error("Erro ao editar usuário:", error);
          toast.error("Erro ao editar usuário.");
        }
      }
      isEditing.value = !isEditing.value;
    };

    const cancelEdit = () => {
      editableUser.value = { ...props.user };
      isEditing.value = false;
    };

    const deleteUser = async () => {
      try {
        await UserService.deleteUser(props.user.id);
        emit('deleted', props.user.id);
        toast.success("Usuário excluído com sucesso!");
      } catch (error) {
        console.error("Erro ao excluir usuário:", error);
        toast.error("Erro ao excluir usuário.");
      }
      showConfirmationModal.value = false;
    };

    return {
      isEditing,
      editableUser,
      validationErrors,
      toast,
      showConfirmationModal,
      validateField,
      toggleEdit,
      cancelEdit,
      deleteUser,
    };
  },
};
</script>
