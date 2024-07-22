<template>
    <div v-if="visible"
        class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50 transition-opacity duration-300 ease-in-out opacity-100">
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg max-w-80 w-full transition-transform transform scale-100 sm:max-w-md md:max-w-lg">
            <svg 
            class="w-16 h-16 fill-red-600 m-auto mb-4"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"
                version="1.1" id="Capa_1" viewBox="0 0 263.65 263.65" xml:space="preserve">
                <g>
                    <path
                        d="M262.846,237.792L137.021,19.858c-1.072-1.856-3.053-3-5.196-3s-4.125,1.144-5.196,3L0.804,237.792   c-1.072,1.856-1.072,4.144,0,6s3.053,3,5.196,3H257.65c2.144,0,4.125-1.144,5.196-3S263.918,239.649,262.846,237.792z    M16.392,234.792L131.825,34.858l115.433,199.935H16.392z" />
                    <path
                        d="M121.491,106.734l4.333,76.404c0.167,3.013,2.576,5.485,5.66,5.66c3.314,0.188,6.152-2.346,6.34-5.66l4.333-76.404   c0.021-0.383,0.022-0.78,0-1.172c-0.324-5.707-5.213-10.071-10.919-9.747S121.168,101.027,121.491,106.734z" />
                    <path
                        d="M131.825,201.915c-1.58,0-3.13,0.64-4.24,1.76c-1.12,1.11-1.76,2.66-1.76,4.24s0.64,3.13,1.76,4.24   c1.11,1.12,2.66,1.76,4.24,1.76s3.13-0.64,4.24-1.76c1.12-1.11,1.76-2.66,1.76-4.24s-0.64-3.13-1.76-4.24   C134.955,202.555,133.405,201.915,131.825,201.915z" />
                </g>
            </svg>
            <h2 class="text-lg font-semibold text-white text-center">{{ message }}</h2>
            <p class="font-thin text-center mb-4">
                Esta ação não pode ser desfeita.
            </p>
            <div class="flex justify-center space-x-4">
                <button @click="confirm"
                    class="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-200">
                    Excluir
                </button>
                <button @click="cancel"
                    class="bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors duration-200">
                    Cancelar
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
    },
    emits: ['confirm', 'cancel'],
    methods: {
        confirm() {
            this.$emit('confirm');
        },
        cancel() {
            this.$emit('cancel');
        },
    },
};
</script>
