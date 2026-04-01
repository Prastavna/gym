// @vitest-environment jsdom
import { describe, expect, it } from "vite-plus/test";
import { mount } from "@vue/test-utils";
import ExercisePanel from "../components/ExercisePanel.vue";
import type { Exercise } from "../data/muscles";

const sampleExercises: Exercise[] = [
  { name: "Bench Press", description: "Press weight up from chest.", difficulty: "intermediate" },
  { name: "Push-Ups", description: "Push body up from floor.", difficulty: "beginner" },
];

describe("ExercisePanel", () => {
  it("shows placeholder when no muscle is selected", () => {
    const wrapper = mount(ExercisePanel, { props: { muscleName: null, exercises: [] } });
    expect(wrapper.text()).toContain("Hover over a muscle");
  });

  it("displays muscle name when provided", () => {
    const wrapper = mount(ExercisePanel, {
      props: { muscleName: "Pectoralis Major", exercises: sampleExercises },
    });
    expect(wrapper.text()).toContain("Pectoralis Major");
  });

  it("renders all exercises", () => {
    const wrapper = mount(ExercisePanel, {
      props: { muscleName: "Pectoralis Major", exercises: sampleExercises },
    });
    expect(wrapper.text()).toContain("Bench Press");
    expect(wrapper.text()).toContain("Push-Ups");
  });

  it("shows difficulty badges", () => {
    const wrapper = mount(ExercisePanel, {
      props: { muscleName: "Test", exercises: sampleExercises },
    });
    expect(wrapper.text()).toContain("intermediate");
    expect(wrapper.text()).toContain("beginner");
  });
});
