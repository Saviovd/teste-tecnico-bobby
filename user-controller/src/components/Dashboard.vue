<template>
  <div class="p-6 min-h-screen w-full text-white relative">
    <h2 class="text-2xl mb-4">Controle de Usuários</h2>

    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
      <KpiCard title="Acessos" value="1,234" description="Total de acessos registrados no último mês." />
      <KpiCard title="Vendas do Mês" value="$4,567" description="Total de vendas realizadas no mês corrente." />
      <KpiCard title="Tickets Resolvidos" value="789"
        description="Número de tickets de suporte resolvidos no último mês." />
    </div>

    <Feedbacks :users="users" />

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      <NewUsersChart />
      <AgeDistributionChart />
      <ActiveInactiveChart />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import NewUsersChart from '../components/NewUsersChart.vue';
import AgeDistributionChart from '../components/AgeDistributionChart.vue';
import ActiveInactiveChart from '../components/ActiveInactiveChart.vue';
import KpiCard from '../components/KpisCard.vue';
import Feedbacks from '../components/Feedbacks.vue';
import UserService from "@/services/UserService";

export default {
  name: 'MainDashboard',
  components: {
    NewUsersChart,
    AgeDistributionChart,
    ActiveInactiveChart,
    KpiCard,
    Feedbacks,
  },
  setup() {
    const showAlerts = ref(false);
    const users = ref([]);

    const toggleAlerts = () => {
      showAlerts.value = !showAlerts.value;
    };

    onMounted(async () => {
      const response = await UserService.getUsers();
      users.value = response.data.data;
    });

    return {
      showAlerts,
      toggleAlerts,
      users
    };
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
