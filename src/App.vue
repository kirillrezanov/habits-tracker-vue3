<script setup lang="ts">
  import { useHabitsStore } from '@/stores/HabitsStore'
  import HabitForm from '@/components/widgets/HabitForm.vue'
  import Button from './components/ui/Button.vue';
  import ProgressBar from './components/ui/ProgressBar.vue';
  import Badge from './components/ui/Badge.vue';
  import Alert from './components/ui/Alert.vue';

  const state = useHabitsStore();
</script>

<template>
  <main>
    <div class="container">
      <h4 class="card-title mb-3 mt-3">Трекер привычек</h4>
      <div class="card mb-3">
        <div class="card-header">Новая привычка</div>
        <div class="card-body">
          <HabitForm @add="state.addHabit" />
        </div>
      </div>
      <div class="card">
        <div class="card-header">Список привычек</div>
        <div class="card-body">
          <Alert class="alert alert-info">
            <div class="mb-3">Завершено привычек: {{ state.habitsStats.completed }} </div>
            <div>Привычки в процессе: {{ state.habitsStats.uncompleted }}</div>
          </Alert>
          <div class="card mb-3" v-for="habit in state.habits" :key="habit.id">
            <div class="card-header">
              <div class="row">
                <span class="col-md-11">{{ habit.title }}</span>
                <div class="col-md-1">
                  <Badge :type="'warning'" v-if="!habit.completed">В процессе</Badge>
                  <Badge :type="'success'" v-if="habit.completed">Завершена</Badge>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="habit_progress">
                <div class="row">
                  <span class="col-md-11">Осталось дней:</span>
                  <span class="col-md-1 right-text text-muted">{{ habit.duration - habit.estimated }}</span>
                </div>
                <ProgressBar :placeholder="habit.estimated" :min="habit.estimated" :max="habit.duration" />
                <Button :classes="['btn', 'btn-outline-primary mt-3']" @click="state.addDay(habit)"
                  v-if="habit.estimated < habit.duration">Добавить день</Button> &nbsp;
                <Button :classes="['btn', 'btn-outline-danger mt-3']" @click="state.rmDay(habit)"
                  v-if="habit.estimated > 0">Вычесть день</Button> &nbsp;
                <Button :classes="['btn', 'btn-outline-danger mt-3']" @click="state.rmHabit(habit)">Удалить
                  привычку</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>