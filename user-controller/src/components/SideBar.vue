<template>
    <aside class="sidebar">
        <div v-if="user" class="user-info">
            <img :src="user.avatar" alt="Avatar" class="user-avatar" />
            <p class="user-name">{{ user.first_name }} {{ user.last_name }}</p>
            <p class="user-email">{{ user.email }}</p>
        </div>
        <nav>
            <ul>
                <li>
                    <router-link to="/">Home</router-link>
                </li>
                <li>
                    <router-link to="/users">Users</router-link>
                </li>
                <li>
                    <router-link to="/about">About</router-link>
                </li>
            </ul>
        </nav>
    </aside>
</template>
<script>
export default {
    name: "SideBar",
    data() {
        return {
            user: null,
        };
    },
    created() {
        this.userFromLocalStorage();
    },
    methods: {
        userFromLocalStorage() {
            const userData = localStorage.getItem("user");
            if (userData) {
                this.user = JSON.parse(userData);
            }
        },
    },
};
</script>
<style scoped>
.sidebar {
    width: 250px;
    height: 100vh;
    background-color: #f4f4f4;
    padding: 20px;
    position: fixed;
    top: 0;
    left: 0;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar nav ul {
    list-style: none;
    padding: 0;
}

.sidebar nav ul li {
    margin-bottom: 10px;
}

.sidebar nav ul li a {
    text-decoration: none;
    color: #333;
    font-weight: bold;
}

.sidebar nav ul li a:hover {
    color: #007bff;
}

.user-info {
    margin-top: 20px;
    text-align: center;
}

.user-avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 10px;
}

.user-name {
    font-weight: bold;
    margin: 5px 0;
}

.user-email {
    color: #666;
}
</style>
