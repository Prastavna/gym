<script setup lang="ts">
import { ref } from "vue";
import { useCountdown } from "../composables/useTimer";

const props = defineProps<{
  active: boolean;
}>();

const emit = defineEmits<{
  start: [];
  done: [];
}>();

const done = ref(false);
const presets = [30, 60, 90] as const;

const { remaining, running, progress, formatted, start, stop } = useCountdown(() => {
  done.value = true;
  emit("done");
});

function begin(seconds: number) {
  done.value = false;
  emit("start");
  start(seconds);
}

function cancel() {
  done.value = false;
  stop();
  emit("done");
}

// SVG ring constants
const radius = 14;
const circumference = 2 * Math.PI * radius;
</script>

<template>
  <div class="inline-flex items-center gap-2">
    <!-- Idle: show preset buttons -->
    <template v-if="!running && !done">
      <button
        v-for="s in presets"
        :key="s"
        class="px-2 py-0.5 text-xs rounded border border-gray-200 text-gray-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors"
        @click="begin(s)"
      >
        {{ s }}s
      </button>
    </template>

    <!-- Running: show ring + time + cancel -->
    <template v-if="running">
      <svg width="32" height="32" class="shrink-0 -rotate-90">
        <circle cx="16" cy="16" :r="radius" fill="none" stroke="#e5e7eb" stroke-width="3" />
        <circle
          cx="16"
          cy="16"
          :r="radius"
          fill="none"
          stroke="#3b82f6"
          stroke-width="3"
          stroke-linecap="round"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="circumference * (1 - progress)"
          class="transition-[stroke-dashoffset] duration-1000 linear"
        />
      </svg>
      <span class="font-mono text-sm font-medium text-blue-600 tabular-nums">{{ formatted }}</span>
      <button class="text-xs text-gray-400 hover:text-gray-600 transition-colors" @click="cancel">
        Cancel
      </button>
    </template>

    <!-- Done: flash -->
    <template v-if="done && !running">
      <span class="text-xs font-medium text-green-600 animate-pulse">Rest complete!</span>
    </template>
  </div>
</template>
