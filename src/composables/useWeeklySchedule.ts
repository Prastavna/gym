import { computed, ref, watch } from "vue";

export const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export type WeekDay = (typeof WEEK_DAYS)[number];
export type ScheduleDayType = "workout" | "rest" | "cardio" | "mobility" | "custom";

export interface DaySchedule {
  type: ScheduleDayType;
  label: string;
  notes: string;
  exercises: string[];
}

export type WeeklySchedule = Record<WeekDay, DaySchedule>;

export const WEEKLY_SCHEDULE_STORAGE_KEY = "muscle-map.weekly-schedule";

function createDefaultDaySchedule(): DaySchedule {
  return {
    type: "workout",
    label: "",
    notes: "",
    exercises: [],
  };
}

export function createDefaultWeeklySchedule(): WeeklySchedule {
  return WEEK_DAYS.reduce((schedule, day) => {
    schedule[day] = createDefaultDaySchedule();
    return schedule;
  }, {} as WeeklySchedule);
}

function normalizeDaySchedule(value: unknown): DaySchedule {
  const day = value && typeof value === "object" ? (value as Partial<DaySchedule>) : {};

  return {
    type: isScheduleDayType(day.type) ? day.type : "workout",
    label: typeof day.label === "string" ? day.label : "",
    notes: typeof day.notes === "string" ? day.notes : "",
    exercises: Array.isArray(day.exercises)
      ? day.exercises.filter((exercise): exercise is string => typeof exercise === "string")
      : [],
  };
}

function isScheduleDayType(value: unknown): value is ScheduleDayType {
  return (
    value === "workout" ||
    value === "rest" ||
    value === "cardio" ||
    value === "mobility" ||
    value === "custom"
  );
}

export function normalizeWeeklySchedule(value: unknown): WeeklySchedule {
  const raw =
    value && typeof value === "object" ? (value as Partial<Record<WeekDay, unknown>>) : {};
  const schedule = createDefaultWeeklySchedule();

  for (const day of WEEK_DAYS) {
    schedule[day] = normalizeDaySchedule(raw[day]);
  }

  return schedule;
}

export function loadWeeklySchedule(): WeeklySchedule {
  if (typeof window === "undefined") {
    return createDefaultWeeklySchedule();
  }

  const storedValue = window.localStorage.getItem(WEEKLY_SCHEDULE_STORAGE_KEY);
  if (!storedValue) {
    return createDefaultWeeklySchedule();
  }

  try {
    return normalizeWeeklySchedule(JSON.parse(storedValue));
  } catch {
    return createDefaultWeeklySchedule();
  }
}

export function saveWeeklySchedule(schedule: WeeklySchedule) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(WEEKLY_SCHEDULE_STORAGE_KEY, JSON.stringify(schedule));
}

export function cloneWeeklySchedule(schedule: WeeklySchedule): WeeklySchedule {
  return normalizeWeeklySchedule(schedule);
}

export function getTodayWeekDay(date = new Date()): WeekDay {
  const jsDay = date.getDay();
  return WEEK_DAYS[(jsDay + 6) % 7];
}

export function getDayTypeLabel(type: ScheduleDayType): string {
  switch (type) {
    case "rest":
      return "Rest";
    case "cardio":
      return "Cardio";
    case "mobility":
      return "Mobility";
    case "custom":
      return "Custom";
    default:
      return "Workout";
  }
}

export function getDayHeadline(daySchedule: DaySchedule): string {
  return daySchedule.label.trim() || getDayTypeLabel(daySchedule.type);
}

export function useWeeklySchedule() {
  const schedule = ref<WeeklySchedule>(loadWeeklySchedule());

  watch(
    schedule,
    (value) => {
      saveWeeklySchedule(value);
    },
    { deep: true },
  );

  const today = computed(() => getTodayWeekDay());
  const todaysSchedule = computed(() => schedule.value[today.value]);
  const plannedDaysCount = computed(
    () =>
      WEEK_DAYS.filter((day) => {
        const entry = schedule.value[day];
        return (
          entry.exercises.length > 0 ||
          entry.notes.trim() ||
          entry.label.trim() ||
          entry.type !== "workout"
        );
      }).length,
  );

  function replaceSchedule(nextSchedule: WeeklySchedule) {
    schedule.value = cloneWeeklySchedule(nextSchedule);
  }

  return {
    schedule,
    today,
    todaysSchedule,
    plannedDaysCount,
    replaceSchedule,
  };
}
