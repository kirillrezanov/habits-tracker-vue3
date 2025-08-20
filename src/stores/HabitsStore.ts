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

interface HabitForm {
    title: string,
    duration: number
}


export const useHabitsStore = defineStore('habits', () => {
    let habits = ref<Habit[]>([
        {
            id: Date.now(),
            title: "Тест",
            completed: false,
            duration: 2,
            estimated: 1
        }
    ]);

    const habitForm = ref<HabitForm>({
        title: "",
        duration: 21
    })

    function addhabit(): void {
        if (!habitForm.value.title || habitForm.value.duration < 1) return;

        habits.value.push({
            title: habitForm.value.title,
            duration: habitForm.value.duration,
            completed: false,
            id: Date.now(),
            estimated: 0
        });

        habitForm.value.title = '';
        habitForm.value.duration = 21;
    }

    function addDay(habit: Habit): void {
        habit.estimated += 1;

        if (habit.estimated >= habit.duration) habit.completed = true;
    }

    function rmDay(habit: Habit): void {
        habit.estimated -= 1;

        if (habit.estimated < habit.duration) habit.completed = false;
    }

    function rmHabit(habit: Habit): void {
        habits.value = habits.value.filter(habitElem => habit.id != habitElem.id);
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
        habitForm,
        addhabit,
        addDay,
        rmDay,
        rmHabit,
        habitsStats
    }
});