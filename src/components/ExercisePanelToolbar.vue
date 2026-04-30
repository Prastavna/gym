<script setup lang="ts">
import SessionTimer from "./SessionTimer.vue";

defineProps<{
  favouriteCount?: number;
}>();

const emit = defineEmits<{
  openSchedule: [];
  openTodayPreview: [];
  openFavourites: [];
}>();
</script>

<template>
  <div class="flex flex-wrap items-center gap-3 border-b border-gray-200 bg-gray-50 px-4 py-2">
    <SessionTimer />
    <div class="ml-auto flex flex-wrap items-center gap-2">
      <button
        type="button"
        class="relative rounded px-2.5 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200"
        :aria-label="`Favourites${favouriteCount ? ` (${favouriteCount})` : ''}`"
        @click="emit('openFavourites')"
      >
        <svg
          viewBox="0 0 24 24"
          class="inline-block size-4 align-text-bottom transition-colors"
          :class="favouriteCount ? 'text-amber-400 fill-current' : 'text-gray-500'"
          :fill="favouriteCount ? 'currentColor' : 'none'"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
          />
        </svg>
        <span v-if="favouriteCount" class="ml-1">{{ favouriteCount }}</span>
      </button>
      <button
        type="button"
        class="rounded px-2.5 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200"
        @click="emit('openSchedule')"
      >
        <span class="hidden sm:inline">Weekly </span>Schedule
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
