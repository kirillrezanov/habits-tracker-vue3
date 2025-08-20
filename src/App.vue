<script setup lang="ts">
  import { useHabitsStore } from '@/stores/HabitsStore'

  const state = useHabitsStore();
</script>

<template>
  <main>
    <div class="container">
      <h4 class="card-title mb-3 mt-3">Трекер привычек</h4>
      <div class="card mb-3">
        <div class="card-header">Новая привычка</div>
        <div class="card-body">
          <div class="row mb-3">
            <div class="col-md-6 form-group">
              <span class="form-label">Название привычки</span>
              <input type="text" v-model="state.habitForm.title" class="form-control">
            </div>
            <div class="col-md-6 form-group">
              <span class="form-label">Срок выработки привычки <sup class="text-secondary">дн</sup></span>
              <input type="number" v-model="state.habitForm.duration" class="form-control" value="21" min="1">
            </div>
          </div>
          <button class="btn btn-outline-success" @click="addhabit">Добавить привычку</button>
        </div>
      </div>
      <div class="card">
        <div class="card-header">Список привычек</div>
        <div class="card-body">
          <div class="alert alert-info">
            <div class="mb-3">Завершено привычек: {{ state.habitsStats.completed }} </div>
            <div>Привычки в процессе: {{ state.habitsStats.uncompleted }}</div>
          </div>
            <div class="card mb-3" v-for="habit in state.habits" :key="habit.id">
              <div class="card-header">
                <div class="row">
                  <span class="col-md-11">{{ habit.title }}</span>
                  <span class="badge bg-success col-md-1" v-if="habit.completed">Завершена</span>
                  <span class="badge bg-warning col-md-1" v-if="!habit.completed">В процессе</span>
                </div>
              </div>
              <div class="card-body">
                <div class="habit_progress">
                  <div class="row">
                    <span class="col-md-11">Осталось дней:</span>
                    <span class="col-md-1 right-text text-muted">{{ habit.duration - habit.estimated }}</span>
                  </div>
                  <div class="progress mt-3" role="progressbar" aria-label="Basic example" :aria-valuenow="habit.estimated" aria-valuemin="0" :aria-valuemax="habit.duration">
                    <div class="progress-bar" :style="{width : (habit.estimated / habit.duration * 100) + '%'}">
                      {{ habit.estimated }}
                    </div>
                  </div>
                  <button class="btn btn-outline-primary mt-3" @click="addDay(habit)" v-if="habit.estimated < habit.duration">Добавить день</button> &nbsp;
                  <button class="btn btn-outline-danger mt-3" @click="rmDay(habit)" v-if="habit.estimated > 0">Вычесть день</button> &nbsp;
                  <button class="btn btn-outline-danger mt-3" @click="rmHabit(habit)">Удалить привычку</button>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </main>
</template>