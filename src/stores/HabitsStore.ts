import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface Habit {
    title: string,
    duration: number,
    estimated: number
    completed: boolean,
    id: number
}

interface HabitsStats {
    completed: number,
    uncompleted: number
}

export const useHabitsStore = defineStore('habits', () => {
    let habits = ref<Habit[]>(JSON.parse(localStorage.getItem('habits')) || []);

    function addHabit(payload : {title : string, duration : number}): void {

        if (!payload.title || payload.duration < 1) return;

        habits.value.push({
            title: payload.title,
            duration: payload.duration,
            completed: false,
            id: Date.now(),
            estimated: 0
        });

        updateLocalStorage();
    }

    function updateLocalStorage() {
        localStorage.setItem("habits", JSON.stringify(habits.value));
    }

    function addDay(habit: Habit): void {
        habit.estimated += 1;

        if (habit.estimated >= habit.duration) habit.completed = true;

        updateLocalStorage();
    }

    function rmDay(habit: Habit): void {
        habit.estimated -= 1;

        if (habit.estimated < habit.duration) habit.completed = false;

        updateLocalStorage();
    }

    function rmHabit(habit: Habit): void {
        habits.value = habits.value.filter(habitElem => habit.id != habitElem.id);

        updateLocalStorage();
    }

    const habitsStats = computed<HabitsStats>(() => {
        let completed: number = 0;
        let uncompleted: number = 0;

        habits.value.forEach(habit => habit.completed ? completed += 1 : uncompleted += 1);

        return {
            completed,
            uncompleted
        }
    });

    return {
        habits,
        addHabit,
        addDay,
        rmDay,
        rmHabit,
        habitsStats
    }
});