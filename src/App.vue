<script setup lang="ts">
  import { reactive, computed } from 'vue'

  interface State {
    habits : Habit[],
    habitForm : HabitForm
  }

  interface Habit {
    title : string,
    duration : number,
    estimated : number
    completed : boolean,
    id : number
  }

  interface HabitsStats {
    completed : number,
    uncompleted : number
  }

  interface HabitForm {
    title : string,
    duration : number
  }

  const state = reactive<State>({
    habits : [
      {
        id : Date.now(),
        title : "Тест",
        completed : false,
        duration : 2,
        estimated : 1
      }
    ],
    habitForm : {
      title : "",
      duration : 21
    }
  });

  function addhabit() : void {
    if(!state.habitForm.title || state.habitForm.duration < 1) return;

    state.habits.push({
      title : state.habitForm.title,
      duration : state.habitForm.duration,
      completed : false,
      id : Date.now(),
      estimated : 0
    });

    state.habitForm.title = '';
    state.habitForm.duration = 21;
  }

  function addDay(habit : Habit) : void {
    habit.estimated += 1;

    if(habit.estimated >= habit.duration) habit.completed = true;
  }

  function rmDay(habit : Habit) : void {
    habit.estimated -= 1;

    if(habit.estimated < habit.duration) habit.completed = false;
  }

  function rmHabit(habit : Habit) : void {
    state.habits = state.habits.filter(habitElem => habit.id != habitElem.id);
  }

  const habitsStats = computed<HabitsStats>(() => {
    let completed : number = 0;
    let uncompleted : number = 0;

    state.habits.forEach(habit => habit.completed ? completed += 1 : uncompleted += 1);

    return {
      completed,
      uncompleted
    }
  });
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
            <div class="mb-3">Завершено привычек: {{ habitsStats.completed }} </div>
            <div>Привычки в процессе: {{ habitsStats.uncompleted }}</div>
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