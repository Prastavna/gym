// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vite-plus/test";
import {
  WEEKLY_SCHEDULE_STORAGE_KEY,
  createDefaultWeeklySchedule,
  loadWeeklySchedule,
  saveWeeklySchedule,
} from "../composables/useWeeklySchedule";

describe("useWeeklySchedule helpers", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("saves and loads a weekly schedule from local storage", () => {
    const schedule = createDefaultWeeklySchedule();
    schedule.Monday.type = "cardio";
    schedule.Monday.label = "Conditioning";
    schedule.Monday.notes = "20 minutes zone 2";
    schedule.Monday.exercises = ["Bike Intervals"];

    saveWeeklySchedule(schedule);

    expect(loadWeeklySchedule()).toEqual(schedule);
  });

  it("falls back to defaults when local storage contains invalid JSON", () => {
    window.localStorage.setItem(WEEKLY_SCHEDULE_STORAGE_KEY, "not-json");

    expect(loadWeeklySchedule()).toEqual(createDefaultWeeklySchedule());
  });
});
