<template>
  <div :class="ShowSidebar && 'app'">
    <SideBar v-if="ShowSidebar" />
    <router-view />
  </div>
</template>

<script>
import SideBar from "./components/SideBar";
import { computed } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "App",
  components: {
    SideBar,
  },
  setup() {
    const route = useRoute();
    const ShowSidebar = computed(() => route.name !== 'Login');

    return { ShowSidebar };
  },
};
</script>

<style>
.app {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding-left: 300px;
}
.app > .sidebar {
  width: 250px;
  position: fixed;
  height: 100vh;
  background: #f4f4f4;
}
</style>
