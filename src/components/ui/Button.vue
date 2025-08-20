<script setup lang="ts">
    interface Props {
        classes : string[]
    }

    const emits = defineEmits(["click"]);

    const props = defineProps<Props>();
</script>

<template>
    <button :class="classes" @click="emits('click')"><slot></slot></button>
</template>