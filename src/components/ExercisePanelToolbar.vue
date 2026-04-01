<script setup lang="ts">
import SessionTimer from "./SessionTimer.vue";

const emit = defineEmits<{
  openSchedule: [];
  openTodayPreview: [];
}>();
</script>

<template>
  <div class="flex flex-wrap items-center gap-3 border-b border-gray-200 bg-gray-50 px-4 py-2">
    <SessionTimer />
    <div class="ml-auto flex flex-wrap items-center gap-2">
      <button
        type="button"
        class="rounded px-2.5 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200"
        @click="emit('openSchedule')"
      >
        Weekly schedule
      </button>
      <button
        type="button"
        class="rounded bg-gray-900 px-2.5 py-1 text-xs font-medium text-white transition-colors hover:bg-gray-700"
        @click="emit('openTodayPreview')"
      >
        Today's plan
      </button>
    </div>
  </div>
</template>
