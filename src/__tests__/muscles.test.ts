import { describe, expect, it } from "vite-plus/test";
import {
  muscles,
  getExercisesForMuscle,
  loadExerciseCatalog,
  mediaFallbackUrl,
} from "../data/muscles";

const exercisesFor = async (id: string) =>
  (await loadExerciseCatalog()).find((m) => m.id === id)!.exercises;

describe("muscles data", () => {
  it("has at least 10 muscle groups defined", () => {
    expect(muscles.length).toBeGreaterThanOrEqual(10);
  });

  it("has a deep overall exercise catalog", () => {
    const totalExercises = muscles.reduce((count, muscle) => count + muscle.exercises.length, 0);

    expect(totalExercises).toBeGreaterThanOrEqual(120);
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

  it("includes expanded forearm and neck exercise libraries", () => {
    const forearmExercises = getExercisesForMuscle("forearms");
    const neckExercises = getExercisesForMuscle("neck");

    expect(forearmExercises).toBeDefined();
    expect(forearmExercises!.length).toBeGreaterThanOrEqual(10);
    expect(neckExercises).toBeDefined();
    expect(neckExercises!.length).toBeGreaterThanOrEqual(8);
  });

  it("returns undefined for unknown muscle", () => {
    expect(getExercisesForMuscle("nonexistent")).toBeUndefined();
  });
});

describe("dataset integration", () => {
  it("keeps the synchronous catalog curated-only for fast first paint", () => {
    const chest = getExercisesForMuscle("pectorals")!;

    expect(chest.length).toBeGreaterThan(0);
    expect(chest.every((ex) => ex.source === "curated")).toBe(true);
  });

  it("augments muscles with imported dataset exercises once loaded", async () => {
    const chest = await exercisesFor("pectorals");
    const datasetOnes = chest.filter((ex) => ex.source === "dataset");

    expect(datasetOnes.length).toBeGreaterThan(50);
    // dataset entries carry rich media + step-by-step instructions
    const withMedia = datasetOnes.find((ex) => ex.image && ex.gif && ex.steps?.length);
    expect(withMedia).toBeDefined();
    expect(withMedia!.image).toContain("hasaneyldrm/exercises-dataset");
  });

  it("serves dataset media from a pinned commit, never a moving branch", async () => {
    const catalog = await loadExerciseCatalog();
    const urls = catalog
      .flatMap((m) => m.exercises)
      .flatMap((ex) => [ex.image, ex.gif])
      .filter((url): url is string => Boolean(url));

    expect(urls.length).toBeGreaterThan(0);
    for (const url of urls) {
      expect(url).toMatch(
        /^https:\/\/cdn\.jsdelivr\.net\/gh\/hasaneyldrm\/exercises-dataset@[0-9a-f]{40}\//,
      );
      expect(mediaFallbackUrl(url)).toMatch(
        /^https:\/\/raw\.githubusercontent\.com\/hasaneyldrm\/exercises-dataset\/[0-9a-f]{40}\//,
      );
    }
  });

  it("maps jsDelivr media URLs to their GitHub raw mirror", () => {
    expect(
      mediaFallbackUrl("https://cdn.jsdelivr.net/gh/owner/repo@abc123/videos/0001-x.gif"),
    ).toBe("https://raw.githubusercontent.com/owner/repo/abc123/videos/0001-x.gif");
    expect(mediaFallbackUrl("https://example.com/a.gif")).toBeNull();
  });

  it("keeps curated exercises and dedupes by name", async () => {
    const chest = await exercisesFor("pectorals");
    const names = chest.map((ex) => ex.name.trim().toLowerCase());

    expect(new Set(names).size).toBe(names.length);
    expect(chest.some((ex) => ex.source === "curated")).toBe(true);
  });

  it("fills obliques from muscle_group/secondary fallback", async () => {
    const obliques = await exercisesFor("obliques");

    expect(obliques.some((ex) => ex.source === "dataset")).toBe(true);
  });

  it("derives difficulty from equipment for dataset exercises", async () => {
    const bodyweight = (await exercisesFor("abdominals")).find(
      (ex) => ex.source === "dataset" && ex.equipment === "body weight",
    );

    expect(bodyweight?.difficulty).toBe("beginner");
  });
});
