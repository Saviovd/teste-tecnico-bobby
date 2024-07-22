<template>
    <div v-if="visible" class="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center">
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg relative w-11/12">
            <button @click="close" class="absolute top-2 right-2 text-gray-400 hover:text-white">
                <svg class="w-10 h-10 fill-neutral-400 hover:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                        d="M12 10.293l4.293-4.293 1.414 1.414L13.414 12l4.293 4.293-1.414 1.414L12 13.414l-4.293 4.293-1.414-1.414L10.586 12 6.293 7.707 7.707 6.293 12 10.293z" />
                </svg>
            </button>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModalForm',
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        close() {
            this.$emit('close');
        }
    }
};
</script>
