<script setup lang="ts">
import { ref, computed } from "vue";
import { muscles } from "../data/muscles";
import MuscleOverlay from "./MuscleOverlay.vue";
import ExercisePanel from "./ExercisePanel.vue";

const activeMuscleId = ref<string | null>(null);
const debug = new URLSearchParams(window.location.search).has("debug");

const activeMuscle = computed(() => muscles.find((m) => m.id === activeMuscleId.value) ?? null);

function onHover(id: string | null) {
  activeMuscleId.value = id;
}
</script>

<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Left: SVG Panel -->
    <div data-testid="svg-panel" class="w-1/2 flex items-center justify-center relative p-4">
      <div class="relative w-full max-w-2xl">
        <img src="/muscles.svg" alt="Human muscle anatomy" class="w-full h-auto" />
        <MuscleOverlay
          :muscles="muscles"
          :active-muscle="activeMuscleId"
          :debug="debug"
          @hover="onHover"
        />
      </div>
    </div>
    <!-- Right: Exercise Panel -->
    <div data-testid="exercise-panel" class="w-1/2 bg-white border-l border-gray-200">
      <ExercisePanel
        :muscle-name="activeMuscle?.name ?? null"
        :exercises="activeMuscle?.exercises ?? []"
      />
    </div>
  </div>
</template>
