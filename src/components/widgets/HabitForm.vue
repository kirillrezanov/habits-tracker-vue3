<script setup lang="ts">
    import { reactive } from 'vue';
import Button from '../ui/Button.vue';
    import Input from '../ui/Input.vue';

    interface HabitForm {
        title : string,
        duration : number
    }

    const emits = defineEmits(["add"])

    const habitForm = reactive<HabitForm>({
        title : "",
        duration : 20
    });

    function add() : void {
        emits('add', {
            title : habitForm.title,
            duration : habitForm.duration
        });
    }
</script>

<template>
    <div class="row mb-3">
        <div class="col-md-6 form-group">
            <Input :label="'Название привычки'" v-model="habitForm.title" type="text" :required="true"/>
        </div>
        <div class="col-md-6 form-group">
            <Input :label="'Длительность выработки привычки'" v-model="habitForm.duration" type="number" :required="true"/>
        </div>
    </div>
    <Button :classes="['btn', 'btn-outline-success']" @click="add">Добавить привычку</Button>
</template>