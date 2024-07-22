<template>
    <div class="w-full bg-gray-700 p-4 rounded-lg shadow-lg mt-6">
        <h3 class="text-xl mb-2 text-neutral-200 font-medium">Feedbacks dos Clientes</h3>
        <div class="space-y-4">
            <div v-for="user in limitedUsers" :key="user.id"
                class="flex items-center space-x-3 bg-gray-800 rounded-lg p-4">
                <img class="w-12 h-12 rounded-full" :src="user.avatar" :alt="user.first_name">
                <div>
                    <p class="font-semibold text-left">{{ user.first_name }} {{ user.last_name }}</p>
                    <p class="text-sm">{{ generateComment() }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UsersFeedbacks',
    props: {
        users: {
            type: Array,
            required: true
        }
    },
    computed: {
        limitedUsers() {
            return this.users.slice(0, 3);
        }
    },
    methods: {
        generateComment() {
            const comments = [
                "Ótimo serviço, muito satisfeito com o atendimento!",
                "A plataforma é intuitiva e fácil de usar. Recomendo!",
                "Precisa melhorar a velocidade, mas a experiência é boa.",
                "Muito bom, mas o suporte pode ser mais ágil.",
                "Excelente, a interface é muito amigável!"
            ];
            return comments[Math.floor(Math.random() * comments.length)];
        }
    }
};
</script>
