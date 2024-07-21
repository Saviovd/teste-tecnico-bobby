<template>
    <div class="flex justify-center items-center max-w-96 relative w-2/4 sm:w-2/3 md:w-1/2 lg:w-1/3 ">
        <input v-model="searchQuery" type="text" placeholder="Search for any user" @input="applyFilter"
            class="p-3 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 w-full h-10 sm:h-12 pr-10" />
        <svg class="w-6 h-6 fill-indigo-500 absolute right-3 top-1/2 transform -translate-y-1/2 border-l-2 border-indigo-500 pl-2"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488.4 488.4">
            <path d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6
            s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2
            S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7
            S381.9,104.65,381.9,203.25z" />
        </svg>
    </div>
</template>

<script>
export default {
    name: "UserSearch",
    data() {
        return {
            searchQuery: ""
        };
    },
    methods: {
        applyFilter() {
            this.$emit('filter', this.searchQuery);
        }
    }
};
</script>