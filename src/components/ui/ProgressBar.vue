<script setup lang="ts">

    interface Props {
        placeholder ? : string | number,
        min : number,
        max : number
    }

    const props = defineProps<Props>();

</script>

<template>
    <div class="progress mt-3" role="progressbar" aria-label="Basic example" :aria-valuenow="min" :aria-valuemin="min" :aria-valuemax="max">
        <div class="progress-bar" :style="{width : ( min / max * 100) + '%'}">
            {{ placeholder }}
        </div>
    </div>
</template>