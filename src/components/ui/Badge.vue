<script setup lang="ts">

    interface Props {
        type ? : string,
    }

    const props = defineProps<Props>();

</script>

<template>
    <span :class="['badge', 'bg-'+type]"><slot></slot></span>
</template>