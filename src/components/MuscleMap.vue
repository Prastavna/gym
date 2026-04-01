<script setup lang="ts">
import { ref, computed } from "vue";
import { muscles } from "../data/muscles";
import MuscleOverlay from "./MuscleOverlay.vue";
import ExercisePanel from "./ExercisePanel.vue";
import ScheduleDialog from "./ScheduleDialog.vue";
import TodayScheduleDialog from "./TodayScheduleDialog.vue";
import { useWeeklySchedule } from "../composables/useWeeklySchedule";

const hoveredMuscleId = ref<string | null>(null);
const stickyMuscleId = ref<string | null>(null);
const debug = new URLSearchParams(window.location.search).has("debug");
const scheduleDialogOpen = ref(false);
const todayDialogOpen = ref(false);
const suggestedExercise = ref<string | null>(null);

/** Show hovered muscle if hovering, otherwise fall back to sticky (last-hovered) */
const displayedMuscleId = computed(() => hoveredMuscleId.value ?? stickyMuscleId.value);
const displayedMuscle = computed(
  () => muscles.find((m) => m.id === displayedMuscleId.value) ?? null,
);
const { schedule, today, todaysSchedule, replaceSchedule } = useWeeklySchedule();

function onHover(id: string | null) {
  if (id !== null) {
    stickyMuscleId.value = id;
  }
  hoveredMuscleId.value = id;
}

function openScheduleDialogWithExercise(exerciseName: string) {
  suggestedExercise.value = exerciseName;
  scheduleDialogOpen.value = true;
}
</script>

<template>
  <div class="flex h-screen flex-col bg-slate-100">
    <div class="flex min-h-0 flex-1 flex-col md:flex-row">
      <div
        data-testid="svg-panel"
        class="relative flex w-full shrink-0 items-center justify-center p-4 md:h-full md:w-1/2 md:shrink"
      >
        <div class="relative w-full max-w-2xl">
          <img src="/muscles.svg" alt="Human muscle anatomy" class="h-auto w-full" />
          <MuscleOverlay
            :muscles="muscles"
            :active-muscle="displayedMuscleId"
            :hovered-muscle="hoveredMuscleId"
            :debug="debug"
            @hover="onHover"
          />
          <p class="mt-2 text-center text-xs text-gray-400">
            SVG by
            <a
              href="https://commons.wikimedia.org/wiki/File:Muscles_front_and_back.svg"
              target="_blank"
              rel="noopener noreferrer"
              class="underline hover:text-gray-600"
            >
              Wikimedia Commons
            </a>
            (CC BY-SA)
          </p>
        </div>
      </div>

      <div
        data-testid="exercise-panel"
        class="min-h-[40vh] w-full flex-1 overflow-y-auto border-t border-gray-200 bg-white md:min-h-0 md:w-1/2 md:border-l md:border-t-0"
      >
        <ExercisePanel
          :muscle-name="displayedMuscle?.name ?? null"
          :common-name="displayedMuscle?.commonName ?? null"
          :exercises="displayedMuscle?.exercises ?? []"
          @add-to-schedule="openScheduleDialogWithExercise"
          @open-schedule="scheduleDialogOpen = true"
          @open-today-preview="todayDialogOpen = true"
        />
      </div>
    </div>

    <ScheduleDialog
      :open="scheduleDialogOpen"
      :schedule="schedule"
      :suggested-exercise="suggestedExercise"
      @close="scheduleDialogOpen = false"
      @save="replaceSchedule"
      @clear-suggested-exercise="suggestedExercise = null"
    />

    <TodayScheduleDialog
      :open="todayDialogOpen"
      :day="today"
      :schedule="todaysSchedule"
      @close="todayDialogOpen = false"
    />
  </div>
</template>
