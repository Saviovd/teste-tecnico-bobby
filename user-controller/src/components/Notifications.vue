<template>
    <transition name="fade">
        <div v-if="showNotifications"
            class="absolute top-16 right-4 bg-gray-500 text-white p-4 rounded-lg shadow-lg w-80">
            <h4 class="text-lg font-semibold mb-2">Mensagens e Alertas</h4>
            <div class="space-y-4">
                <div v-for="(notification, index) in notifications" :key="index"
                    class="flex items-center space-x-3 border-b border-gray-400 pb-2">
                    <template v-if="notification.type === 'info'">
                        <svg class="w-5 h-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 5v14m-7-7h14" />
                        </svg>
                        <span>{{ notification.message }}</span>
                    </template>
                    <template v-if="notification.type === 'error'">
                        <svg class="w-5 h-5 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span>{{ notification.message }}</span>
                    </template>
                    <template v-if="notification.type === 'alert'">
                        <svg class="w-5 h-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 2L2 22h20L12 2z" />
                        </svg>
                        <span>{{ notification.message }}</span>
                    </template>
                    <template v-if="notification.type === 'update'">
                        <svg class="w-5 h-5 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v8l4 4" />
                        </svg>
                        <span>{{ notification.message }}</span>
                    </template>
                    <template v-if="notification.type === 'comment'">
                        <svg class="w-5 h-5 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 4v4a4 4 0 014 4v4h-4v-4h-4v4H4V8a4 4 0 014-4h4z" />
                        </svg>
                        <span>{{ notification.message }}</span>
                    </template>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'NewNotifications',
    props: {
        notifications: {
            type: Array,
            required: true
        }
    },
    computed: {
        showNotifications() {
            return this.$parent.showNotifications;
        }
    }
};
</script>


<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>