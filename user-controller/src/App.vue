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
    height: 100vh;
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
</style>
