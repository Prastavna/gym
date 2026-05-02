import { ref, watch } from "vue";

const STORAGE_KEY = "muscle-map-personal-records";

function loadFromStorage(): Record<string, string> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

// Module-level singleton shared across all component instances
const records = ref<Record<string, string>>(loadFromStorage());

watch(
  records,
  (val) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
  },
  { deep: true },
);

export function usePersonalRecords() {
  function setRecord(exerciseName: string, value: string) {
    const trimmed = value.trim();
    const next = { ...records.value };
    if (trimmed) {
      next[exerciseName] = trimmed;
    } else {
      delete next[exerciseName];
    }
    records.value = next;
  }

  function getRecord(exerciseName: string): string {
    return records.value[exerciseName] ?? "";
  }

  return { records, setRecord, getRecord };
}
