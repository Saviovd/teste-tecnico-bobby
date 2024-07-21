<template>
    <div class="logout-button-container absolute bottom-4 left-0 w-full flex justify-center items-center">
        <button @click="handleLogout"
            class="p-4 transition-transform duration-300 ease-in-out flex gap-2 items-center hover:text-zinc-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="fill-indigo-500 w-6 h-6" viewBox="0 0 384.971 384.971">
                <g id="Sign_Out">
                    <path
                        d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03C192.485,366.299,187.095,360.91,180.455,360.91z" />
                    <path
                        d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z" />
                </g>
            </svg>
            <span class="capitalize text-lg text-indigo-500">logout</span>
        </button>
    </div>
</template>

<script>
export default {
    methods: {
        handleLogout() {
            this.$emit('logout');
        }
    }
};
</script>

<style scoped>
button:hover svg {
    fill: #e2e8f0;
}

button:hover span {
    color: #e2e8f0;
}
</style>
