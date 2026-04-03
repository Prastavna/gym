<script setup lang="ts">
import { computed, ref } from "vue";
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
        class="relative flex w-full shrink-0 items-center justify-center px-4 md:py-4 md:h-full md:w-1/2 md:shrink"
      >
        <a
          href="https://github.com/Prastavna/gym"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open GitHub repository"
          class="absolute left-3 top-3 z-10 inline-flex items-center justify-center rounded-full bg-white/90 p-2 text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-white hover:text-slate-900"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" class="size-5 fill-current">
            <path
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.866-.014-1.699-2.782.605-3.369-1.344-3.369-1.344-.454-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.004.071 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.349-1.088.635-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.748-1.026 2.748-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.481A10.02 10.02 0 0 0 22 12.017C22 6.484 17.523 2 12 2Z"
            />
          </svg>
        </a>
        <div class="relative w-full max-w-2xl">
          <img src="/muscles.svg" alt="Human muscle anatomy" class="h-auto w-full" />
          <MuscleOverlay
            :muscles="muscles"
            :active-muscle="displayedMuscleId"
            :hovered-muscle="hoveredMuscleId"
            :debug="debug"
            @hover="onHover"
          />
          <p class="hidden mt-2 text-center text-xs text-gray-400">
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
