// @vitest-environment jsdom
import { describe, expect, it } from "vite-plus/test";
import { mount } from "@vue/test-utils";
import ExercisePanel from "../components/ExercisePanel.vue";
import type { Exercise } from "../data/muscles";

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
  it("shows placeholder when no muscle is selected", () => {
    const wrapper = mount(ExercisePanel, {
      props: { muscleName: null, commonName: null, exercises: [] },
    });
    expect(wrapper.text()).toContain("Hover over a muscle");
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
});
