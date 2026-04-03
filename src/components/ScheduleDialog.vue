<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import Accordion from "./Accordion.vue";
import AppDialog from "./AppDialog.vue";
import { muscles } from "../data/muscles";
import {
  WEEK_DAYS,
  cloneWeeklySchedule,
  getDayHeadline,
  getDayTypeLabel,
  getTodayWeekDay,
  type WeekDay,
  type WeeklySchedule,
} from "../composables/useWeeklySchedule";

const props = defineProps<{
  open: boolean;
  schedule: WeeklySchedule;
  suggestedExercise: string | null;
}>();

const emit = defineEmits<{
  close: [];
  save: [schedule: WeeklySchedule];
  clearSuggestedExercise: [];
}>();

const draftSchedule = reactive(cloneWeeklySchedule(props.schedule));
const customExerciseInputs = reactive<Record<WeekDay, string>>(
  WEEK_DAYS.reduce(
    (inputs, day) => {
      inputs[day] = "";
      return inputs;
    },
    {} as Record<WeekDay, string>,
  ),
);
const quickAddDay = ref<WeekDay>(getTodayWeekDay());
const availableExercises = computed(() =>
  Array.from(
    new Set(muscles.flatMap((muscle) => muscle.exercises.map((exercise) => exercise.name.trim()))),
  ).sort((left, right) => left.localeCompare(right)),
);

function resetDraft() {
  const nextSchedule = cloneWeeklySchedule(props.schedule);
  for (const day of WEEK_DAYS) {
    draftSchedule[day] = nextSchedule[day];
    customExerciseInputs[day] = "";
  }
  quickAddDay.value = getTodayWeekDay();
}

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      resetDraft();
    }
  },
);

function addExercise(day: WeekDay, exerciseName: string) {
  const normalized = exerciseName.trim();
  if (!normalized) {
    return;
  }

  const exercises = draftSchedule[day].exercises;
  if (!exercises.includes(normalized)) {
    exercises.push(normalized);
  }
}

function addCustomExercise(day: WeekDay) {
  addExercise(day, customExerciseInputs[day]);
  customExerciseInputs[day] = "";
}

function addSuggestedExercise() {
  if (!props.suggestedExercise) {
    return;
  }

  addExercise(quickAddDay.value, props.suggestedExercise);
  emit("clearSuggestedExercise");
}

function removeExercise(day: WeekDay, exerciseName: string) {
  draftSchedule[day].exercises = draftSchedule[day].exercises.filter(
    (exercise) => exercise !== exerciseName,
  );
}

function clearDay(day: WeekDay) {
  draftSchedule[day] = {
    type: "workout",
    label: "",
    notes: "",
    exercises: [],
  };
  customExerciseInputs[day] = "";
}

function save() {
  emit("save", cloneWeeklySchedule(draftSchedule));
  emit("close");
}
</script>

<template>
  <AppDialog
    v-if="open"
    title="Weekly gym schedule"
    description="Plan each day, add exercises, and keep the schedule saved in local storage."
    @close="emit('close')"
  >
    <div class="space-y-6 p-6">
      <section
        v-if="suggestedExercise"
        class="rounded-2xl border border-indigo-200 bg-indigo-50 p-4"
      >
        <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p class="text-sm font-medium text-indigo-700">Quick add from exercise panel</p>
            <p class="text-base font-semibold text-slate-900">{{ suggestedExercise }}</p>
          </div>
          <div class="flex flex-col gap-2 sm:flex-row sm:items-center">
            <label class="text-sm text-slate-600">
              <span class="sr-only">Choose day for suggested exercise</span>
              <select
                v-model="quickAddDay"
                class="rounded-xl border border-indigo-200 bg-white px-3 py-2 text-sm text-slate-700"
              >
                <option v-for="day in WEEK_DAYS" :key="day" :value="day">{{ day }}</option>
              </select>
            </label>
            <button
              type="button"
              class="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
              @click="addSuggestedExercise"
            >
              Add to day
            </button>
          </div>
        </div>
      </section>

      <section class="grid gap-4 lg:grid-cols-2">
        <Accordion
          v-for="day in WEEK_DAYS"
          :key="day"
          :title="day"
          :description="getDayHeadline(draftSchedule[day])"
          :default-open="day === getTodayWeekDay()"
          :data-testid="`schedule-day-${day.toLowerCase()}`"
        >
          <template #actions>
            <button
              type="button"
              class="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-500 transition hover:border-slate-300 hover:text-slate-800"
              @click="clearDay(day)"
            >
              Clear day
            </button>
          </template>

          <div class="grid gap-3">
            <label class="text-sm text-slate-600">
              <span class="mb-1 block">Day type</span>
              <select
                v-model="draftSchedule[day].type"
                class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
              >
                <option value="workout">{{ getDayTypeLabel("workout") }}</option>
                <option value="rest">{{ getDayTypeLabel("rest") }}</option>
                <option value="cardio">{{ getDayTypeLabel("cardio") }}</option>
                <option value="mobility">{{ getDayTypeLabel("mobility") }}</option>
                <option value="custom">{{ getDayTypeLabel("custom") }}</option>
              </select>
            </label>

            <label class="text-sm text-slate-600">
              <span class="mb-1 block">Focus or label</span>
              <input
                v-model="draftSchedule[day].label"
                type="text"
                class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                placeholder="Upper body, easy run, full rest..."
              />
            </label>

            <label class="text-sm text-slate-600">
              <span class="mb-1 block">Notes</span>
              <textarea
                v-model="draftSchedule[day].notes"
                rows="3"
                class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                placeholder="Sets, reps, pace targets, recovery notes..."
              />
            </label>

            <div>
              <div class="mb-2 flex items-center justify-between">
                <span class="text-sm font-medium text-slate-700">Exercises</span>
                <span class="text-xs text-slate-400"
                  >{{ draftSchedule[day].exercises.length }} planned</span
                >
              </div>
              <div v-if="draftSchedule[day].exercises.length" class="flex flex-wrap gap-2">
                <button
                  v-for="exercise in draftSchedule[day].exercises"
                  :key="exercise"
                  type="button"
                  class="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700 transition hover:border-rose-200 hover:text-rose-600"
                  @click="removeExercise(day, exercise)"
                >
                  {{ exercise }} x
                </button>
              </div>
              <p
                v-else
                class="rounded-2xl border border-dashed border-slate-200 bg-white px-3 py-4 text-sm text-slate-400"
              >
                No exercises added yet.
              </p>
            </div>

            <div class="flex gap-2">
              <input
                v-model="customExerciseInputs[day]"
                :list="`exercise-options-${day.toLowerCase()}`"
                type="text"
                class="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                placeholder="Search or add a custom exercise"
                @keydown.enter.prevent="addCustomExercise(day)"
              />
              <datalist :id="`exercise-options-${day.toLowerCase()}`">
                <option v-for="exercise in availableExercises" :key="exercise" :value="exercise" />
              </datalist>
              <button
                type="button"
                class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
                @click="addCustomExercise(day)"
              >
                Add
              </button>
            </div>
          </div>
        </Accordion>
      </section>

      <div class="flex justify-end border-t border-slate-200 pt-4">
        <button
          type="button"
          class="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
          @click="save"
        >
          Save schedule
        </button>
      </div>
    </div>
  </AppDialog>
</template>
