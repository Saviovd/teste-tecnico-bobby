import { ref } from 'vue';
const messages = [
    { message: 'Nova mensagem recebida!', type: 'info' },
    { message: 'Alerta de sistema!', type: 'alert' },
    { message: 'Erro ao carregar dados!', type: 'error' },
    { message: 'Atualização disponível!', type: 'update' },
    { message: 'Novo comentário!', type: 'comment' }
];

export function useNotifications() {
    const notifications = ref([]);
    const notificationsCount = ref(generateRandomNotificationCount());
    const showNotifications = ref(false);

    function generateNotifications(count) {
        return Array.from({ length: count }, () => {
            const notification = messages[Math.floor(Math.random() * messages.length)];
            return notification;
        });
    }

    function generateRandomNotificationCount() {
        return Math.floor(Math.random() * 5);
    }

    function toggleNotifications() {
        showNotifications.value = !showNotifications.value;
        if (showNotifications.value) {
            notificationsCount.value = 0;
        }
    }

    return {
        notifications,
        notificationsCount,
        showNotifications,
        toggleNotifications,
        generateNotifications,
        generateRandomNotificationCount
    };
}
