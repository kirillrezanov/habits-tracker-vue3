<script setup lang="ts">
    interface Props {
        value: string | number,
        type: string | "text",
        label: string,
        min?: number,
        max?: number,
        placeholder? : string,
        required? : boolean
    }

    defineProps<Props>();

    const emits = defineEmits('change');

    function change(e : Event) : void {
        emits('change');
    }
</script>

<template>
    <span class="form-label">{{ label }}<span v-if="required">*</span></span>
    <input :type="type" :value="value" @change="change" :min="min" :max="max" :placeholder="placeholder" class="form-control mt-3" :required="required">
</template>