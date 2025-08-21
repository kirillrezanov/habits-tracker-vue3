<script setup lang="ts">
  import { useHabitsStore } from '@/stores/HabitsStore'
  import HabitForm from '@/components/widgets/HabitForm.vue'
  import Button from './components/ui/Button.vue';
  import ProgressBar from './components/ui/ProgressBar.vue';
  import Badge from './components/ui/Badge.vue';
  import Alert from './components/ui/Alert.vue';
  import Card from './components/widgets/Card.vue';

  const state = useHabitsStore();
</script>

<template>
  <main>
    <div class="container">
      <h4 class="card-title mb-3 mt-3">Трекер привычек</h4>
      <Card title="Новая привычка">
        <HabitForm @add="state.addHabit" />
      </Card>
      <Card :classes="['mt-3', 'mb-3']" title="Список привычек">
        <Alert class="alert alert-info">
          <div class="mb-3">Завершено привычек: {{ state.habitsStats.completed }} </div>
          <div>Привычки в процессе: {{ state.habitsStats.uncompleted }}</div>
        </Alert>
        <Card :classes="['mb-3']" :title="habit.title" v-for="habit in state.habits" :key="habit.id">
          <div class="col-md-1">
            <Badge type="warning" v-if="!habit.completed">В процессе</Badge>
            <Badge type="success" v-if="habit.completed">Завершена</Badge>
          </div>
          <div class="habit_progress">
            <div class="row">
              <span class="col-md-11">Осталось дней:</span>
              <span class="col-md-1 right-text text-muted">{{ habit.duration - habit.estimated }}</span>
            </div>
            <ProgressBar :placeholder="habit.estimated" :min="habit.estimated" :max="habit.duration" />
            <div class="d-flex gap-2 mt-3">
              <Button :classes="['btn', 'btn-outline-primary mt-3']" @click="state.addDay(habit)"
                v-if="habit.estimated < habit.duration">Добавить день</Button>
              <Button :classes="['btn', 'btn-outline-danger mt-3']" @click="state.rmDay(habit)"
                v-if="habit.estimated > 0">Вычесть день</Button>
              <Button :classes="['btn', 'btn-outline-danger mt-3']" @click="state.rmHabit(habit)">Удалить привычку</Button>
            </div>
          </div>
        </Card>
      </Card>
    </div>
  </main>
</template>