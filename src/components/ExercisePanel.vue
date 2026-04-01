<script setup lang="ts">
import { ref } from "vue";
import type { Exercise } from "../data/muscles";
import RestTimer from "./RestTimer.vue";
import ExercisePanelToolbar from "./ExercisePanelToolbar.vue";

defineProps<{
  muscleName: string | null;
  commonName: string | null;
  exercises: Exercise[];
}>();

const emit = defineEmits<{
  addToSchedule: [exerciseName: string];
  openSchedule: [];
  openTodayPreview: [];
}>();

const activeRestExercise = ref<string | null>(null);

const badgeColor = (d: Exercise["difficulty"]) =>
  d === "beginner"
    ? "bg-green-100 text-green-800"
    : d === "intermediate"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-red-100 text-red-800";
</script>

<template>
  <div class="h-full flex flex-col">
    <ExercisePanelToolbar
      @open-schedule="emit('openSchedule')"
      @open-today-preview="emit('openTodayPreview')"
    />
    <div
      v-if="!muscleName"
      class="flex items-center justify-center flex-1 min-h-[30vh] text-gray-400 text-lg text-center px-4"
    >
      <span class="hidden md:inline">Hover over a muscle to see exercises</span>
      <span class="md:hidden">Tap a muscle to see exercises</span>
    </div>
    <template v-else>
      <div class="flex-1 overflow-y-auto p-6">
        <h2 class="text-2xl font-bold text-gray-800">{{ commonName }}</h2>
        <p class="text-sm text-gray-500 mb-4">{{ muscleName }}</p>
        <div class="space-y-4">
          <div
            v-for="exercise in exercises"
            :key="exercise.name"
            class="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
          >
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-semibold text-gray-700">{{ exercise.name }}</h3>
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  class="rounded-full border border-indigo-200 px-3 py-1 text-xs font-semibold text-indigo-600 transition hover:border-indigo-300 hover:bg-indigo-50"
                  @click="emit('addToSchedule', exercise.name)"
                >
                  Add to plan
                </button>
                <span
                  class="text-xs font-medium px-2 py-1 rounded-full"
                  :class="badgeColor(exercise.difficulty)"
                >
                  {{ exercise.difficulty }}
                </span>
              </div>
            </div>
            <p class="text-sm text-gray-600">{{ exercise.description }}</p>
            <div v-if="exercise.resources?.length" class="mt-2 flex flex-wrap gap-2">
              <a
                v-for="resource in exercise.resources"
                :key="resource.link"
                :href="resource.link"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 hover:underline"
              >
                <span v-if="resource.type === 'video'">&#9654;</span>
                <span v-else>&#128196;</span>
                {{ resource.text }}
              </a>
            </div>
            <div class="mt-3 pt-2 border-t border-gray-100">
              <RestTimer
                :active="activeRestExercise === exercise.name"
                @start="activeRestExercise = exercise.name"
                @done="activeRestExercise = null"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
