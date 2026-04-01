<script setup lang="ts">
import { useStopwatch } from "../composables/useTimer";

const { formatted, running, toggle, reset } = useStopwatch();
</script>

<template>
  <div class="flex items-center gap-3 text-sm">
    <span class="font-mono text-lg font-semibold text-gray-700 tabular-nums">{{ formatted }}</span>
    <button
      type="button"
      :aria-label="running ? 'Pause session timer' : 'Start session timer'"
      class="rounded p-2 text-xs font-medium transition-colors sm:px-2.5 sm:py-1"
      :class="
        running
          ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
          : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
      "
      @click="toggle"
    >
      <span class="sm:hidden" aria-hidden="true">
        <svg v-if="running" viewBox="0 0 20 20" class="size-4 fill-current">
          <path
            d="M6 4.5A1.5 1.5 0 0 1 7.5 6v8A1.5 1.5 0 0 1 6 15.5 1.5 1.5 0 0 1 4.5 14V6A1.5 1.5 0 0 1 6 4.5Zm8 0A1.5 1.5 0 0 1 15.5 6v8A1.5 1.5 0 0 1 14 15.5 1.5 1.5 0 0 1 12.5 14V6A1.5 1.5 0 0 1 14 4.5Z"
          />
        </svg>
        <svg v-else viewBox="0 0 20 20" class="size-4 fill-current">
          <path
            d="M6.5 4.77c0-1.22 1.35-1.95 2.37-1.27l7.44 4.96a1.53 1.53 0 0 1 0 2.54L8.87 15.96c-1.02.68-2.37-.05-2.37-1.27V4.77Z"
          />
        </svg>
      </span>
      <span class="hidden sm:inline">{{ running ? "Pause" : "Start" }}</span>
    </button>
    <button
      type="button"
      aria-label="Reset session timer"
      class="rounded bg-gray-100 p-2 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200 sm:px-2.5 sm:py-1"
      @click="reset"
    >
      <span class="sm:hidden" aria-hidden="true">
        <svg viewBox="0 0 20 20" class="size-4 fill-none stroke-current stroke-[1.8]">
          <path
            d="M15.25 8.25A5.75 5.75 0 1 0 16 11"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path d="M15.25 4.75v3.5h-3.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
      <span class="hidden sm:inline">Reset</span>
    </button>
    <span class="text-xs text-gray-400 hidden md:inline">Session</span>
  </div>
</template>
