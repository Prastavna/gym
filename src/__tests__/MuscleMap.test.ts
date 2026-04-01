// @vitest-environment jsdom
import { describe, expect, it } from "vite-plus/test";
import { mount } from "@vue/test-utils";
import MuscleMap from "../components/MuscleMap.vue";

describe("MuscleMap", () => {
  it("renders left and right panels", () => {
    const wrapper = mount(MuscleMap);
    expect(wrapper.find("[data-testid='svg-panel']").exists()).toBe(true);
    expect(wrapper.find("[data-testid='exercise-panel']").exists()).toBe(true);
  });

  it("shows placeholder text in exercise panel initially", () => {
    const wrapper = mount(MuscleMap);
    expect(wrapper.text()).toContain("Click on a muscle");
  });

  it("shows exercises when a muscle overlay is clicked", async () => {
    const wrapper = mount(MuscleMap);
    const polygon = wrapper.find("polygon");
    await polygon.trigger("click");
    expect(wrapper.text()).not.toContain("Click on a muscle");
  });

  it("keeps exercises visible after mouse leaves the muscle", async () => {
    const wrapper = mount(MuscleMap);
    const polygon = wrapper.find("polygon");
    await polygon.trigger("click");
    await polygon.trigger("mouseleave");
    // Exercises should still be visible after mouseleave
    expect(wrapper.text()).not.toContain("Click on a muscle");
  });

  it("shows Wikimedia attribution", () => {
    const wrapper = mount(MuscleMap);
    expect(wrapper.text()).toContain("Wikimedia Commons");
  });
});
