// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vite-plus/test";
import { nextTick } from "vue";
import { usePersonalRecords } from "../composables/usePersonalRecords";

describe("usePersonalRecords", () => {
  beforeEach(() => {
    localStorage.clear();
    const { records } = usePersonalRecords();
    records.value = {};
  });

  it("returns empty string for an unknown exercise", () => {
    const { getRecord } = usePersonalRecords();
    expect(getRecord("Bench Press")).toBe("");
  });

  it("stores and retrieves a record", () => {
    const { setRecord, getRecord } = usePersonalRecords();
    setRecord("Bench Press", "70 lbs × 10 reps");
    expect(getRecord("Bench Press")).toBe("70 lbs × 10 reps");
  });

  it("trims whitespace before storing", () => {
    const { setRecord, getRecord } = usePersonalRecords();
    setRecord("Bench Press", "  70 lbs  ");
    expect(getRecord("Bench Press")).toBe("70 lbs");
  });

  it("deletes the entry when set to an empty string", () => {
    const { setRecord, getRecord, records } = usePersonalRecords();
    setRecord("Bench Press", "70 lbs");
    setRecord("Bench Press", "");
    expect(getRecord("Bench Press")).toBe("");
    expect("Bench Press" in records.value).toBe(false);
  });

  it("deletes the entry when set to whitespace only", () => {
    const { setRecord, getRecord, records } = usePersonalRecords();
    setRecord("Bench Press", "70 lbs");
    setRecord("Bench Press", "   ");
    expect(getRecord("Bench Press")).toBe("");
    expect("Bench Press" in records.value).toBe(false);
  });

  it("stores records for multiple exercises independently", () => {
    const { setRecord, getRecord } = usePersonalRecords();
    setRecord("Bench Press", "70 lbs");
    setRecord("Push-Ups", "50 reps");
    expect(getRecord("Bench Press")).toBe("70 lbs");
    expect(getRecord("Push-Ups")).toBe("50 reps");
  });

  it("persists to localStorage after setRecord", async () => {
    const { setRecord } = usePersonalRecords();
    setRecord("Squat", "100 kg × 5");
    await nextTick();
    const stored = JSON.parse(localStorage.getItem("muscle-map-personal-records") ?? "{}");
    expect(stored["Squat"]).toBe("100 kg × 5");
  });

  it("removes key from localStorage when cleared", async () => {
    const { setRecord } = usePersonalRecords();
    setRecord("Squat", "100 kg");
    await nextTick();
    setRecord("Squat", "");
    await nextTick();
    const stored = JSON.parse(localStorage.getItem("muscle-map-personal-records") ?? "{}");
    expect("Squat" in stored).toBe(false);
  });
});
