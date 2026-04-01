<script setup lang="ts">
import { ref, computed } from "vue";
import { muscles } from "../data/muscles";
import MuscleOverlay from "./MuscleOverlay.vue";
import ExercisePanel from "./ExercisePanel.vue";

const hoveredMuscleId = ref<string | null>(null);
const stickyMuscleId = ref<string | null>(null);
const debug = new URLSearchParams(window.location.search).has("debug");

/** Show hovered muscle if hovering, otherwise fall back to sticky (last-hovered) */
const displayedMuscleId = computed(() => hoveredMuscleId.value ?? stickyMuscleId.value);
const displayedMuscle = computed(
  () => muscles.find((m) => m.id === displayedMuscleId.value) ?? null,
);

function onHover(id: string | null) {
  if (id !== null) {
    stickyMuscleId.value = id;
  }
  hoveredMuscleId.value = id;
}
</script>

<template>
  <div class="flex flex-col md:flex-row h-screen bg-gray-50">
    <!-- Left / Top: SVG Panel -->
    <div
      data-testid="svg-panel"
      class="w-full md:w-1/2 flex items-center justify-center relative p-4 shrink-0 md:shrink md:h-full"
    >
      <div class="relative w-full max-w-2xl">
        <img src="/muscles.svg" alt="Human muscle anatomy" class="w-full h-auto" />
        <MuscleOverlay
          :muscles="muscles"
          :active-muscle="displayedMuscleId"
          :hovered-muscle="hoveredMuscleId"
          :debug="debug"
          @hover="onHover"
        />
        <p class="text-center text-xs text-gray-400 mt-2">
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
    <!-- Right / Bottom: Exercise Panel -->
    <div
      data-testid="exercise-panel"
      class="w-full md:w-1/2 bg-white border-t md:border-t-0 md:border-l border-gray-200 min-h-[40vh] md:min-h-0 flex-1 overflow-y-auto"
    >
      <ExercisePanel
        :muscle-name="displayedMuscle?.name ?? null"
        :common-name="displayedMuscle?.commonName ?? null"
        :exercises="displayedMuscle?.exercises ?? []"
      />
    </div>
  </div>
</template>
