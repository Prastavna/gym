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
    expect(wrapper.text()).toContain("muscle to see exercises");
  });

  it("shows exercises when a muscle is hovered", async () => {
    const wrapper = mount(MuscleMap);
    const polygon = wrapper.find("polygon");
    await polygon.trigger("mouseenter");
    expect(wrapper.text()).not.toContain("muscle to see exercises");
  });

  it("keeps exercises visible after mouse leaves (sticky)", async () => {
    const wrapper = mount(MuscleMap);
    const polygon = wrapper.find("polygon");
    await polygon.trigger("mouseenter");
    await polygon.trigger("mouseleave");
    // Last-hovered muscle should remain displayed
    expect(wrapper.text()).not.toContain("muscle to see exercises");
  });

  it("shows Wikimedia attribution", () => {
    const wrapper = mount(MuscleMap);
    expect(wrapper.text()).toContain("Wikimedia Commons");
  });
});
