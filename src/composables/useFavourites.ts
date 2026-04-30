import { ref, watch } from "vue";

const STORAGE_KEY = "muscle-map-favourites";

function loadFromStorage(): Set<string> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return new Set(stored ? JSON.parse(stored) : []);
  } catch {
    return new Set();
  }
}

// Module-level singleton so all component instances share state
const favourites = ref<Set<string>>(loadFromStorage());

watch(favourites, (val) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...val]));
});

export function useFavourites() {
  function toggle(exerciseName: string) {
    const next = new Set(favourites.value);
    if (next.has(exerciseName)) {
      next.delete(exerciseName);
    } else {
      next.add(exerciseName);
    }
    favourites.value = next;
  }

  function isFavourite(exerciseName: string): boolean {
    return favourites.value.has(exerciseName);
  }

  return { favourites, toggle, isFavourite };
}
