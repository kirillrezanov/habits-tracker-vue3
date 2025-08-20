<script setup lang="ts">
    import Button from '../ui/Button.vue';
    import Input from '../ui/Input.vue';
    
    const title = defineModel<string>('title');
    const duration = defineModel<number>('duration');

    const emits = defineEmits(["add"])

    function add() : void {
        emits('add');
    }

    function change() {
        console.log(1)
    }
</script>

<template>
    <div class="row mb-3">
        <div class="col-md-6 form-group">
            <Input :label="'Название привычки'" @change="change" :required="true"/>
        </div>
        <div class="col-md-6 form-group">
            <Input :label="'Длительность выработки привычки'" @change="change" :required="true"/>
        </div>
    </div>
    <Button :classes="['btn', 'btn-outline-success']" @click="add">Добавить привычку</button>
</template>