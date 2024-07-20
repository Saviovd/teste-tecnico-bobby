<template>
    <div class="w-full bg-gray-900 p-4 rounded-lg shadow-lg">
        <h3 class="text-xl mb-2 text-indigo-400">{{ title }}</h3>
        <div class="text-3xl font-bold mb-2">{{ value }}</div>
        <p class="text-sm">{{ description }}</p>
    </div>
</template>

<script>
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
    }
};
</script>