<script setup lang="ts">
    interface Props {
        title : string,
        classes : string[]
    }

    const props = defineProps<Props>();
</script>

<template>
    <div :class="['card', classes]">
        <div class="card-header">
            {{ title }}
        </div>
        <div class="card-body">
            <slot></slot>
        </div>
    </div>
</template>