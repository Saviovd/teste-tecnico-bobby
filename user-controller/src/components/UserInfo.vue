<template>
    <div v-if="user" class="user-info text-center mb-6 mr-4 border-b border-gray-700 pb-4 pt-20">
        <img :src="user.avatar" alt="Avatar" class="user-avatar w-32 h-32 rounded-full mx-auto mb-2" />
        <p class="user-name text-xl font-semibold text-indigo-400">{{ user.first_name }} {{ user.last_name }}</p>
        <p class="user-email text-gray-400">{{ user.email }}</p>
    </div>
</template>

<script>
export default {
    props: {
        user: Object
    }
};
</script>
