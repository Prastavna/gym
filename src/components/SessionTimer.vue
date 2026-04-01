<script setup lang="ts">
import { useStopwatch } from "../composables/useTimer";

const { formatted, running, toggle, reset } = useStopwatch();
</script>

<template>
  <div class="flex items-center gap-3 px-4 py-2 bg-gray-50 border-b border-gray-200 text-sm">
    <span class="font-mono text-lg font-semibold text-gray-700 tabular-nums">{{ formatted }}</span>
    <button
      class="px-2.5 py-1 rounded text-xs font-medium transition-colors"
      :class="
        running
          ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
          : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
      "
      @click="toggle"
    >
      {{ running ? "Pause" : "Start" }}
    </button>
    <button
      class="px-2.5 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
      @click="reset"
    >
      Reset
    </button>
    <span class="text-xs text-gray-400 ml-auto">Session</span>
  </div>
</template>
