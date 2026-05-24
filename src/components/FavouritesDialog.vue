<script setup lang="ts">
import { computed } from "vue";
import AppDialog from "./AppDialog.vue";
import { muscles } from "../data/muscles";
import { useFavourites } from "../composables/useFavourites";
import { usePersonalRecords } from "../composables/usePersonalRecords";

const emit = defineEmits<{
  close: [];
  selectMuscle: [muscleId: string];
}>();

const { favourites, toggle } = useFavourites();
const { getRecord } = usePersonalRecords();

const props = defineProps<{
  open: boolean;
}>();

const favouriteExercises = computed(() => {
  const result: Array<{ exerciseName: string; muscleCommonName: string; muscleId: string }> = [];

  for (const muscle of muscles) {
    for (const exercise of muscle.exercises) {
      if (favourites.value.has(exercise.name)) {
        result.push({
          exerciseName: exercise.name,
          muscleCommonName: muscle.commonName,
          muscleId: muscle.id,
        });
      }
    }
  }

  return result;
});
</script>

<template>
  <AppDialog
    v-if="open"
    title="Favourite Exercises"
    :description="
      favouriteExercises.length
        ? `${favouriteExercises.length} exercise${favouriteExercises.length === 1 ? '' : 's'} saved`
        : 'No favourites yet'
    "
    width-class="max-w-2xl"
    @close="emit('close')"
  >
    <div class="p-6">
      <div
        v-if="favouriteExercises.length === 0"
        class="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-12 text-center"
      >
        <div class="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-amber-50">
          <svg
            viewBox="0 0 24 24"
            class="size-6 text-amber-400"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
        </div>
        <p class="text-sm font-medium text-slate-600">No favourites yet</p>
        <p class="mt-1 text-sm text-slate-400">Tap the star on any exercise to save it here.</p>
      </div>

      <div v-else class="overflow-hidden rounded-xl border border-gray-200">
        <table class="w-full text-sm">
          <thead>
            <tr
              class="border-b border-gray-200 bg-gray-50 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
            >
              <th class="px-4 py-3">Exercise</th>
              <th class="px-4 py-3">Muscle</th>
              <th class="px-4 py-3">PR</th>
              <th class="px-4 py-3 text-right"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 bg-white">
            <tr v-for="ex in favouriteExercises" :key="ex.exerciseName" class="hover:bg-gray-50">
              <td class="px-4 py-3 font-medium text-gray-800">
                <button
                  type="button"
                  class="text-left text-gray-800 transition hover:text-blue-600 hover:underline"
                  :aria-label="`View muscle for ${ex.exerciseName}`"
                  @click="emit('selectMuscle', ex.muscleId)"
                >
                  {{ ex.exerciseName }}
                </button>
              </td>
              <td class="px-4 py-3 text-gray-500">{{ ex.muscleCommonName }}</td>
              <td class="px-4 py-3 text-gray-700">{{ getRecord(ex.exerciseName) || "—" }}</td>
              <td class="px-4 py-3 text-right">
                <button
                  type="button"
                  class="rounded-full p-1 text-amber-400 transition hover:text-gray-300"
                  :aria-label="`Remove ${ex.exerciseName} from favourites`"
                  @click="toggle(ex.exerciseName)"
                >
                  <svg viewBox="0 0 24 24" class="size-4" fill="currentColor">
                    <path
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </AppDialog>
</template>
