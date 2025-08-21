<script setup lang="ts">
    interface Props {
        value: string,
        type: string | "text",
        label: string,
        min?: number,
        max?: number,
        placeholder? : string,
        required? : boolean
    }

    const value = defineModel<string>();

    defineProps<Props>();
</script>

<template>
    <div class="form-label mb-3" v-if="label">{{ label }}<span v-if="required">*</span></div>
    <input :type="type" v-model="value" :min="min" :max="max" :placeholder="placeholder" class="form-control" :required="required">
</template>