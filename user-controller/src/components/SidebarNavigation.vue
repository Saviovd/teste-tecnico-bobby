<template>
    <nav>
        <ul class="list-none p-0">
            <li v-for="link in links" :key="link.path" class="mb-3 text-center flex items-center justify-center">
                <router-link :to="link.path"
                    class="nav-link text-indigo-400 pt-2 text-2xl tracking-wider justify-center hover:text-zinc-300 flex items-center w-full"
                    active-class="active-link">
                    <component :is="link.icon" class="icon w-6 h-6" />
                    {{ link.name }}
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    props: {
        links: Array
    }
};
</script>

<style scoped>
.nav-link {
    display: flex;
    align-items: center;
    transform: translateX(-4px);
}

.nav-link:hover .icon {
    stroke: #d1d5db;
}

.active-link {
    color: #d1d5db;
    background-color: #1f2937;
    transform: translateX(4px);
    transition: 0.5s;
}

.active-link .icon {
    stroke: #d1d5db;
}
</style>
