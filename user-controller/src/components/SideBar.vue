<template>
    <div>
        <SidebarButton v-if="!isSidebarOpen && !isDesktop" @toggleSidebar="toggleSidebar"
            :isSidebarAnimating="isSidebarAnimating" position="left">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </SidebarButton>

        <aside :class="{ 'sidebar-open': isSidebarOpen || isDesktop, 'sidebar-closed': !isSidebarOpen && !isDesktop }"
            class="sidebar bg-gray-900 p-4 pr-0 fixed top-0 left-0 h-full shadow-md transition-transform duration-300 ease-in-out">
            <SidebarButton v-if="isSidebarOpen && !isDesktop" @toggleSidebar="toggleSidebar"
                :isSidebarAnimating="isSidebarAnimating" position="right">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </SidebarButton>

            <UserInfo :user="user" />

            <SidebarNavigation :links="navLinks" />

            <LogoutButton @logout="handleLogout" />
        </aside>
    </div>
</template>

<script>
import SidebarButton from './SidebarButton.vue';
import UserInfo from './UserInfo.vue';
import SidebarNavigation from './SidebarNavigation.vue';
import LogoutButton from './LogoutButton.vue';

import HomeIcon from '@/assets/icons/HomeIcon.vue';
import UsersIcon from '@/assets/icons/UsersIcon.vue';
import AboutIcon from '@/assets/icons/AboutIcon.vue';

export default {
    name: "SideBar",
    components: {
        SidebarButton,
        UserInfo,
        SidebarNavigation,
        LogoutButton
    },
    data() {
        return {
            user: null,
            isSidebarOpen: false,
            isDesktop: window.innerWidth >= 768,
            isSidebarAnimating: false,
            navLinks: [
                { name: 'Home', path: '/', icon: HomeIcon },
                { name: 'Users', path: '/users', icon: UsersIcon },
                { name: 'About', path: '/about', icon: AboutIcon }
            ]
        };
    },
    created() {
        this.userFromLocalStorage();
        window.addEventListener('resize', this.handleResize);
        this.watchRouteChanges();
    },
    unmounted() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        userFromLocalStorage() {
            const userData = localStorage.getItem("user");
            if (userData) {
                this.user = JSON.parse(userData);
            }
        },
        toggleSidebar() {
            if (!this.isDesktop) {
                this.isSidebarOpen = !this.isSidebarOpen;
                this.isSidebarAnimating = true;
                setTimeout(() => {
                    this.isSidebarAnimating = false;
                }, 300);
            }
        },
        handleResize() {
            this.isDesktop = window.innerWidth >= 768;
            if (this.isDesktop) {
                this.isSidebarOpen = true;
            } else {
                this.isSidebarOpen = false;
            }
        },
        handleLogout() {
            localStorage.removeItem('user');
            localStorage.removeItem('authToken');
            window.location.reload();
        },
        watchRouteChanges() {
            const router = this.$router;

            this.$watch(
                () => router.currentRoute.value.path,
                () => {
                    if (window.innerWidth < 768) {
                        this.isSidebarOpen = false;
                    }
                }
            );
        }
    }
};
</script>

<style scoped>
.sidebar {
    width: 50vw;
    z-index: 40;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
    min-width: 280px;
}

.sidebar-open {
    transform: translateX(0);
}

.sidebar-closed {
    transform: translateX(-100%);
}

@media (min-width: 768px) {
    .sidebar {
        width: 20rem;
        position: fixed;
        height: 100vh;
        transform: translateX(0);
    }
}

button {
    transform-origin: center;
}

button.opacity-0 {
    opacity: 0;
}

button.opacity-100 {
    opacity: 1;
}

button.transform-left {
    transition: transform 0.1s ease-in-out, opacity 0.2s ease-in-out;
    animation: left-to-right .5s;
}

button.transform-right {
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    animation: right-to-left .5s;
}

@keyframes right-to-left {
    0% {
        transform: translateX(-20px);
    }

    100% {
        transform: translateX(0px);
    }
}

@keyframes left-to-right {
    0% {
        transform: translateX(20px);
    }

    100% {
        transform: translateX(0px);
    }
}
</style>
