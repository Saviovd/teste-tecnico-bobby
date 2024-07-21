<template>
  <div :class="{ app: ShowSidebar }">
    <SideBar v-if="ShowSidebar" />
    <router-view :onclick="showNotifications === true ? toggleNotifications : ''" />
    <Notifications v-if="showNotifications && !isLoginPage" :notifications="notifications" />
    <NotificationButton v-if="!isLoginPage" @click="toggleNotifications" :count="notificationsCount" />
  </div>
</template>



<script>
import SideBar from "./components/SideBar";
import Notifications from "./components/Notifications";
import NotificationButton from "./components/NotificationButton";
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useNotifications } from "./utils/notifications";
import './styles/tailwind.css';

export default {
  name: "App",
  components: {
    SideBar,
    Notifications,
    NotificationButton
  },
  setup() {
    const route = useRoute();
    const ShowSidebar = computed(() => route.name !== 'Login');
    const isLoginPage = computed(() => route.name === 'Login');

    const { 
      notifications, 
      notificationsCount, 
      showNotifications, 
      toggleNotifications, 
      generateNotifications 
    } = useNotifications();

    onMounted(() => {
      notifications.value = generateNotifications(notificationsCount.value);
    });

    return {
      ShowSidebar,
      notifications,
      notificationsCount,
      showNotifications,
      toggleNotifications,
      isLoginPage
    };
  },
};
</script>


<style>
@media (min-width: 768px) {
  .app {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding-left: 21.5rem;
  }
}

button.relative {
  position: relative;
}

.notification-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background: red;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

.overflow-container {
  height: 100%;
  width: 100%;
  overflow: auto;
  padding: 1rem;
}

.overflow-container::-webkit-scrollbar {
  width: 8px;
}

.overflow-container::-webkit-scrollbar-track {
  background: #2d2d2d;
}

.overflow-container::-webkit-scrollbar-thumb {
  background: #6366f1;
  border-radius: 4px;
}

.overflow-container::-webkit-scrollbar-thumb:hover {
  background: #4f46e5;
}
</style>
