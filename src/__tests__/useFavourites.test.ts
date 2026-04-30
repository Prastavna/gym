// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vite-plus/test";
import { nextTick } from "vue";
import { useFavourites } from "../composables/useFavourites";

describe("useFavourites", () => {
  beforeEach(() => {
    localStorage.clear();
    // Reset module-level singleton between tests
    const { favourites } = useFavourites();
    favourites.value = new Set();
  });

  it("starts empty", () => {
    const { favourites } = useFavourites();
    expect(favourites.value.size).toBe(0);
  });

  it("isFavourite returns false for unknown exercise", () => {
    const { isFavourite } = useFavourites();
    expect(isFavourite("Bench Press")).toBe(false);
  });

  it("toggle adds an exercise", () => {
    const { toggle, isFavourite } = useFavourites();
    toggle("Bench Press");
    expect(isFavourite("Bench Press")).toBe(true);
  });

  it("toggle removes an exercise when called twice", () => {
    const { toggle, isFavourite } = useFavourites();
    toggle("Bench Press");
    toggle("Bench Press");
    expect(isFavourite("Bench Press")).toBe(false);
  });

  it("multiple exercises can be favourited independently", () => {
    const { toggle, isFavourite } = useFavourites();
    toggle("Bench Press");
    toggle("Push-Ups");
    expect(isFavourite("Bench Press")).toBe(true);
    expect(isFavourite("Push-Ups")).toBe(true);
  });

  it("persists to localStorage after toggle", async () => {
    const { toggle } = useFavourites();
    toggle("Push-Ups");
    await nextTick();
    const stored: string[] = JSON.parse(localStorage.getItem("muscle-map-favourites") ?? "[]");
    expect(stored).toContain("Push-Ups");
  });

  it("removes from localStorage when unfavourited", async () => {
    const { toggle } = useFavourites();
    toggle("Push-Ups");
    await nextTick();
    toggle("Push-Ups");
    await nextTick();
    const stored: string[] = JSON.parse(localStorage.getItem("muscle-map-favourites") ?? "[]");
    expect(stored).not.toContain("Push-Ups");
  });

  it("favourites count reflects current state", () => {
    const { toggle, favourites } = useFavourites();
    expect(favourites.value.size).toBe(0);
    toggle("A");
    toggle("B");
    expect(favourites.value.size).toBe(2);
    toggle("A");
    expect(favourites.value.size).toBe(1);
  });
});
