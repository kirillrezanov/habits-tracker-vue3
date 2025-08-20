<script setup lang="ts">

    interface Props {
        type ? : string,
    }

    const props = defineProps<Props>();

</script>

<template>
    <div :class="['alert', 'alert-'+type]"><slot></slot></div>
</template>