import { describe, expect, it } from "vite-plus/test";
import { muscles, getExercisesForMuscle } from "../data/muscles";

describe("muscles data", () => {
  it("has at least 10 muscle groups defined", () => {
    expect(muscles.length).toBeGreaterThanOrEqual(10);
  });

  it("each muscle has required fields", () => {
    for (const muscle of muscles) {
      expect(muscle.id).toBeTruthy();
      expect(muscle.name).toBeTruthy();
      expect(muscle.commonName).toBeTruthy();
      expect(muscle.exercises.length).toBeGreaterThan(0);
      expect(muscle.region).toBeTruthy();
    }
  });

  it("each muscle has unique id", () => {
    const ids = muscles.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("getExercisesForMuscle", () => {
  it("returns exercises for a valid muscle id", () => {
    const exercises = getExercisesForMuscle("pectorals");
    expect(exercises).toBeDefined();
    expect(exercises!.length).toBeGreaterThan(0);
  });

  it("returns undefined for unknown muscle", () => {
    expect(getExercisesForMuscle("nonexistent")).toBeUndefined();
  });
});
