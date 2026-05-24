<script setup lang="ts">
import { computed, ref } from "vue";
import type { Exercise } from "../data/muscles";
import RestTimer from "./RestTimer.vue";
import ExercisePanelToolbar from "./ExercisePanelToolbar.vue";
import { useFavourites } from "../composables/useFavourites";
import { usePersonalRecords } from "../composables/usePersonalRecords";

const props = defineProps<{
  muscleName: string | null;
  commonName: string | null;
  exercises: Exercise[];
}>();

const emit = defineEmits<{
  addToSchedule: [exerciseName: string];
  openSchedule: [];
  openTodayPreview: [];
  openFavourites: [];
}>();

const { toggle, isFavourite, favourites } = useFavourites();
const { getRecord, setRecord } = usePersonalRecords();

const activeRestExercise = ref<string | null>(null);
const searchQuery = ref("");
const difficultyFilter = ref<Exercise["difficulty"] | "all">("all");
const difficultyOrder: Record<Exercise["difficulty"], number> = {
  beginner: 0,
  intermediate: 1,
  advanced: 2,
};

const badgeColor = (d: Exercise["difficulty"]) =>
  d === "beginner"
    ? "bg-green-100 text-green-800"
    : d === "intermediate"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-red-100 text-red-800";

const filteredExercises = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  return props.exercises
    .filter((exercise) => {
      const matchesDifficulty =
        difficultyFilter.value === "all" || exercise.difficulty === difficultyFilter.value;
      const matchesQuery =
        !query ||
        exercise.name.toLowerCase().includes(query) ||
        exercise.description.toLowerCase().includes(query);

      return matchesDifficulty && matchesQuery;
    })
    .sort((a, b) => {
      const favouriteDelta = Number(isFavourite(b.name)) - Number(isFavourite(a.name));

      if (favouriteDelta !== 0) {
        return favouriteDelta;
      }

      const difficultyDelta = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];

      if (difficultyDelta !== 0) {
        return difficultyDelta;
      }

      return a.name.localeCompare(b.name);
    });
});
</script>

<template>
  <div class="h-full flex flex-col">
    <ExercisePanelToolbar
      :favourite-count="favourites.size"
      @open-schedule="emit('openSchedule')"
      @open-today-preview="emit('openTodayPreview')"
      @open-favourites="emit('openFavourites')"
    />
    <div
      v-if="!muscleName"
      class="flex items-center justify-center flex-1 min-h-[30vh] text-gray-400 text-lg text-center px-4"
    >
      <span class="hidden md:inline">Hover over a muscle to see exercises</span>
      <span class="md:hidden">Tap a muscle to see exercises</span>
    </div>
    <template v-else>
      <div class="flex-1 overflow-y-auto p-6">
        <div class="flex gap-2 items-center mb-2">
          <h2 class="text-2xl font-bold text-gray-800">{{ commonName }}</h2>
          <p class="text-sm text-gray-500">({{ muscleName }})</p>
        </div>
        <div class="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-3">
          <div class="flex flex-col gap-3 md:flex-row">
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Search exercises"
              class="min-w-0 flex-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700"
            />
            <select
              v-model="difficultyFilter"
              class="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700"
            >
              <option value="all">All levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <p class="mt-2 text-xs text-gray-500">
            Showing {{ filteredExercises.length }} of {{ exercises.length }} exercises
          </p>
        </div>
        <div class="space-y-4">
          <div
            v-if="filteredExercises.length === 0"
            class="rounded-lg border border-dashed border-gray-200 bg-gray-50 px-4 py-8 text-center text-sm text-gray-500"
          >
            No exercises match this filter.
          </div>
          <div
            v-for="exercise in filteredExercises"
            :key="exercise.name"
            class="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
          >
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-semibold text-gray-700">{{ exercise.name }}</h3>
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  class="rounded-full border border-indigo-200 px-3 py-1 text-xs font-semibold text-indigo-600 transition hover:border-indigo-300 hover:bg-indigo-50"
                  @click="emit('addToSchedule', exercise.name)"
                >
                  Add to plan
                </button>
                <span
                  class="text-xs font-medium px-2 py-1 rounded-full"
                  :class="badgeColor(exercise.difficulty)"
                >
                  {{ exercise.difficulty }}
                </span>
                <button
                  type="button"
                  class="rounded-full p-1 transition"
                  :class="
                    isFavourite(exercise.name)
                      ? 'text-amber-400 hover:text-amber-500'
                      : 'text-gray-300 hover:text-amber-400'
                  "
                  :aria-label="
                    isFavourite(exercise.name)
                      ? `Remove ${exercise.name} from favourites`
                      : `Add ${exercise.name} to favourites`
                  "
                  @click="toggle(exercise.name)"
                >
                  <svg
                    viewBox="0 0 24 24"
                    class="size-5"
                    :fill="isFavourite(exercise.name) ? 'currentColor' : 'none'"
                    stroke="currentColor"
                    stroke-width="1.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <p class="text-sm text-gray-600">{{ exercise.description }}</p>
            <div v-if="exercise.resources?.length" class="mt-2 flex flex-wrap gap-2">
              <a
                v-for="resource in exercise.resources"
                :key="resource.link"
                :href="resource.link"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 hover:underline"
              >
                <span v-if="resource.type === 'video'">&#9654;</span>
                <span v-else>&#128196;</span>
                {{ resource.text }}
              </a>
            </div>
            <div class="mt-3 flex items-center gap-2">
              <span class="shrink-0 text-xs font-semibold uppercase tracking-wide text-amber-500"
                >PR</span
              >
              <input
                type="text"
                :value="getRecord(exercise.name)"
                placeholder="e.g. 70 lbs × 20 reps"
                class="min-w-0 flex-1 rounded border border-transparent bg-transparent px-1 py-0.5 text-xs text-gray-600 placeholder-gray-300 transition hover:border-gray-200 focus:border-gray-300 focus:bg-gray-50 focus:outline-none"
                @blur="setRecord(exercise.name, ($event.target as HTMLInputElement).value)"
                @keyup.enter="($event.target as HTMLInputElement).blur()"
              />
            </div>
            <div class="mt-2 pt-2 border-t border-gray-100">
              <RestTimer
                :active="activeRestExercise === exercise.name"
                @start="activeRestExercise = exercise.name"
                @done="activeRestExercise = null"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
