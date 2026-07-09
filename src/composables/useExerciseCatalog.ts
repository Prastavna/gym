import { ref } from "vue";
import { muscles as curatedCatalog, loadExerciseCatalog, type Muscle } from "../data/muscles";

/**
 * Shared, reactive exercise catalog. It starts with the curated muscles (ready
 * synchronously for a fast first paint) and swaps to the dataset-augmented
 * catalog once the lazily-loaded dataset chunk resolves.
 */
const catalog = ref<Muscle[]>(curatedCatalog);
const loaded = ref(false);
let started = false;

export function useExerciseCatalog() {
  if (!started) {
    started = true;
    loadExerciseCatalog()
      .then((merged) => {
        catalog.value = merged;
        loaded.value = true;
      })
      .catch((error) => {
        // Keep the curated catalog if the dataset chunk fails to load.
        console.error("Failed to load exercise dataset", error);
      });
  }

  return { muscles: catalog, loaded };
}
