<template>
    <nav>
        <ul class="list-none p-0">
            <li v-for="link in links" :key="link.path" class="mb-3 text-center pt-4">
                <router-link :to="link.path" class="text-indigo-400 text-2xl tracking-wider hover:text-zinc-300">{{
                    link.name }}</router-link>
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
