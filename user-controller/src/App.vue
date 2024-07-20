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
import './styles/tailwind.css'

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
  padding-left: 4rem;
  padding-top: 2rem;
}

@media (min-width: 768px) {
  .app {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding-left: 22rem;
  }
}
</style>
