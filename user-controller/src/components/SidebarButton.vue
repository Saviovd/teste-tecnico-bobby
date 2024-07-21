<template>
    <button @click="onClick" :class="buttonClass"
        class="p-4 text-white bg-gray-700 z-50 transition-transform duration-300 ease-in-out hover:bg-gray-500">
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: {
        isSidebarAnimating: Boolean,
        position: String
    },
    computed: {
        buttonClass() {
            return {
                'absolute top-4 left-4': this.position === 'left',
                'absolute top-4 right-4': this.position === 'right',
                'opacity-0 transform-left': this.isSidebarAnimating && this.position === 'left',
                'opacity-100 transform-right': !this.isSidebarAnimating && this.position === 'left',
                'opacity-0 transform-right': this.isSidebarAnimating && this.position === 'right',
                'opacity-100 transform-left': !this.isSidebarAnimating && this.position === 'right'
            };
        }
    },
    methods: {
        onClick() {
            this.$emit('toggleSidebar');
        }
    }
};
</script>
