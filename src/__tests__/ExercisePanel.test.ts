// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vite-plus/test";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import ExercisePanel from "../components/ExercisePanel.vue";
import type { Exercise } from "../data/muscles";
import { useFavourites } from "../composables/useFavourites";

const sampleExercises: Exercise[] = [
  {
    name: "Bench Press",
    description: "Press weight up from chest.",
    difficulty: "intermediate",
    resources: [{ type: "video", link: "https://example.com/bench", text: "Bench Press Guide" }],
  },
  {
    name: "Push-Ups",
    description: "Push body up from floor.",
    difficulty: "beginner",
    resources: [],
  },
];

describe("ExercisePanel", () => {
  beforeEach(() => {
    localStorage.clear();
    const { favourites } = useFavourites();
    favourites.value = new Set();
  });

  it("shows placeholder when no muscle is selected", () => {
    const wrapper = mount(ExercisePanel, {
      props: { muscleName: null, commonName: null, exercises: [] },
    });
    expect(wrapper.text()).toContain("muscle to see exercises");
  });

  it("displays muscle name and common name when provided", () => {
    const wrapper = mount(ExercisePanel, {
      props: { muscleName: "Pectoralis Major", commonName: "Chest", exercises: sampleExercises },
    });
    expect(wrapper.text()).toContain("Chest");
    expect(wrapper.text()).toContain("Pectoralis Major");
  });

  it("renders all exercises", () => {
    const wrapper = mount(ExercisePanel, {
      props: { muscleName: "Pectoralis Major", commonName: "Chest", exercises: sampleExercises },
    });
    expect(wrapper.text()).toContain("Bench Press");
    expect(wrapper.text()).toContain("Push-Ups");
  });

  it("shows difficulty badges", () => {
    const wrapper = mount(ExercisePanel, {
      props: { muscleName: "Test", commonName: "Test", exercises: sampleExercises },
    });
    expect(wrapper.text()).toContain("intermediate");
    expect(wrapper.text()).toContain("beginner");
  });

  it("renders resource links", () => {
    const wrapper = mount(ExercisePanel, {
      props: { muscleName: "Pectoralis Major", commonName: "Chest", exercises: sampleExercises },
    });
    const link = wrapper.find("a[href='https://example.com/bench']");
    expect(link.exists()).toBe(true);
    expect(link.text()).toContain("Bench Press Guide");
  });

  it("shows session timer when muscle is selected", () => {
    const wrapper = mount(ExercisePanel, {
      props: { muscleName: "Test", commonName: "Test", exercises: sampleExercises },
    });
    expect(wrapper.text()).toContain("00:00");
    expect(wrapper.text()).toContain("Session");
  });

  it("shows schedule actions beside the session timer", () => {
    const wrapper = mount(ExercisePanel, {
      props: { muscleName: "Test", commonName: "Test", exercises: sampleExercises },
    });

    expect(wrapper.text()).toContain("Schedule");
    expect(wrapper.text()).toContain("Today's plan");
  });

  it("filters exercises by search query", async () => {
    const wrapper = mount(ExercisePanel, {
      props: { muscleName: "Test", commonName: "Test", exercises: sampleExercises },
    });

    await wrapper.find("input[type='search']").setValue("push");

    expect(wrapper.text()).toContain("Push-Ups");
    expect(wrapper.text()).not.toContain("Bench Press Guide");
    expect(wrapper.text()).not.toContain("Bench Press");
  });

  it("filters exercises by difficulty", async () => {
    const wrapper = mount(ExercisePanel, {
      props: { muscleName: "Test", commonName: "Test", exercises: sampleExercises },
    });

    await wrapper.find("select").setValue("beginner");

    expect(wrapper.text()).toContain("Push-Ups");
    expect(wrapper.text()).not.toContain("Bench Press");
  });

  it("shows an empty state when filters match nothing", async () => {
    const wrapper = mount(ExercisePanel, {
      props: { muscleName: "Test", commonName: "Test", exercises: sampleExercises },
    });

    await wrapper.find("input[type='search']").setValue("nothing-here");

    expect(wrapper.text()).toContain("No exercises match this filter.");
  });

  it("shows rest timer presets on each exercise card", () => {
    const wrapper = mount(ExercisePanel, {
      props: { muscleName: "Test", commonName: "Test", exercises: sampleExercises },
    });
    const buttons = wrapper.findAll("button").filter((b) => b.text() === "60s");
    // One per exercise card
    expect(buttons.length).toBe(sampleExercises.length);
  });

  it("renders a star button on each exercise card", () => {
    const wrapper = mount(ExercisePanel, {
      props: { muscleName: "Test", commonName: "Test", exercises: sampleExercises },
    });
    const stars = wrapper.findAll("button[aria-label*='favourites']");
    expect(stars.length).toBe(sampleExercises.length);
  });

  it("star button shows 'Add to favourites' label when not favourited", () => {
    const wrapper = mount(ExercisePanel, {
      props: { muscleName: "Test", commonName: "Test", exercises: sampleExercises },
    });
    expect(wrapper.find("button[aria-label='Add Bench Press to favourites']").exists()).toBe(true);
  });

  it("clicking star toggles to 'Remove from favourites'", async () => {
    const wrapper = mount(ExercisePanel, {
      props: { muscleName: "Test", commonName: "Test", exercises: sampleExercises },
    });
    await wrapper.find("button[aria-label='Add Bench Press to favourites']").trigger("click");
    await nextTick();
    expect(wrapper.find("button[aria-label='Remove Bench Press from favourites']").exists()).toBe(
      true,
    );
  });

  it("clicking star twice unfavourites the exercise", async () => {
    const wrapper = mount(ExercisePanel, {
      props: { muscleName: "Test", commonName: "Test", exercises: sampleExercises },
    });
    await wrapper.find("button[aria-label='Add Bench Press to favourites']").trigger("click");
    await nextTick();
    await wrapper.find("button[aria-label='Remove Bench Press from favourites']").trigger("click");
    await nextTick();
    expect(wrapper.find("button[aria-label='Add Bench Press to favourites']").exists()).toBe(true);
  });

  it("favourites toolbar button shows count when exercises are starred", async () => {
    const wrapper = mount(ExercisePanel, {
      props: { muscleName: "Test", commonName: "Test", exercises: sampleExercises },
    });
    await wrapper.find("button[aria-label='Add Bench Press to favourites']").trigger("click");
    await nextTick();
    expect(wrapper.find("button[aria-label='Favourites (1)']").exists()).toBe(true);
  });
});
