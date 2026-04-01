<script setup lang="ts">
import AppDialog from "./AppDialog.vue";
import {
  getDayHeadline,
  getDayTypeLabel,
  type DaySchedule,
  type WeekDay,
} from "../composables/useWeeklySchedule";

defineProps<{
  open: boolean;
  day: WeekDay;
  schedule: DaySchedule;
}>();

const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <AppDialog
    v-if="open"
    :title="`Today's schedule: ${day}`"
    description="A compact preview of the plan saved for today."
    width-class="max-w-2xl"
    @close="emit('close')"
  >
    <div class="space-y-5 p-6">
      <section class="rounded-3xl border border-slate-200 bg-slate-50 p-5">
        <div class="flex items-center justify-between gap-3">
          <div>
            <p class="text-sm text-slate-500">Day type</p>
            <h3 class="text-2xl font-semibold text-slate-900">{{ getDayHeadline(schedule) }}</h3>
          </div>
          <span
            class="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white"
          >
            {{ getDayTypeLabel(schedule.type) }}
          </span>
        </div>

        <p
          v-if="schedule.notes"
          class="mt-4 rounded-2xl bg-white px-4 py-3 text-sm leading-6 text-slate-600"
        >
          {{ schedule.notes }}
        </p>
      </section>

      <section>
        <div class="mb-3 flex items-center justify-between">
          <h4 class="text-sm font-semibold uppercase tracking-wide text-slate-500">Exercises</h4>
          <span class="text-sm text-slate-400">{{ schedule.exercises.length }} items</span>
        </div>

        <ul v-if="schedule.exercises.length" class="space-y-2">
          <li
            v-for="exercise in schedule.exercises"
            :key="exercise"
            class="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700"
          >
            {{ exercise }}
          </li>
        </ul>

        <p
          v-else
          class="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500"
        >
          No exercises planned for today yet. You can still use this as a
          {{ getDayTypeLabel(schedule.type).toLowerCase() }} day.
        </p>
      </section>
    </div>
  </AppDialog>
</template>
