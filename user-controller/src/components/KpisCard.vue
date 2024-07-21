<template>
    <div class="w-full bg-gray-900 p-4 rounded-lg shadow-lg">
        <h3 class="text-xl mb-2 text-indigo-400">{{ title }}</h3>
        <div class="text-3xl font-bold mb-2">
            <span class="value" ref="valueRef">{{ displayedValue }}</span>
        </div>
        <p class="text-sm">{{ description }}</p>
    </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import anime from 'animejs';

export default {
    name: 'KpiCard',
    props: {
        title: {
            type: String,
            required: true
        },
        value: {
            type: [String, Number],
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const displayedValue = ref(0);
        const valueRef = ref(null);

        const animateValue = () => {
            anime({
                targets: valueRef.value,
                innerHTML: [0, props.value],
                round: 1,
                easing: 'easeOutExpo',
                duration: 2000
            });
        };

        watch(() => props.value, (newValue) => {
            if (newValue !== displayedValue.value) {
                displayedValue.value = newValue;
                animateValue();
            }
        }, { immediate: true });

        onMounted(() => {
            animateValue();
        });

        return {
            displayedValue,
            valueRef
        };
    }
};
</script>
