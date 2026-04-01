<script setup lang="ts">
import type { Exercise } from "../data/muscles";

defineProps<{
  muscleName: string | null;
  exercises: Exercise[];
}>();

const badgeColor = (d: Exercise["difficulty"]) =>
  d === "beginner"
    ? "bg-green-100 text-green-800"
    : d === "intermediate"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-red-100 text-red-800";
</script>

<template>
  <div class="h-full p-6 overflow-y-auto">
    <div v-if="!muscleName" class="flex items-center justify-center h-full text-gray-400 text-lg">
      Hover over a muscle to see exercises
    </div>
    <div v-else>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">{{ muscleName }}</h2>
      <div class="space-y-4">
        <div
          v-for="exercise in exercises"
          :key="exercise.name"
          class="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
        >
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-semibold text-gray-700">{{ exercise.name }}</h3>
            <span
              class="text-xs font-medium px-2 py-1 rounded-full"
              :class="badgeColor(exercise.difficulty)"
            >
              {{ exercise.difficulty }}
            </span>
          </div>
          <p class="text-sm text-gray-600">{{ exercise.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
