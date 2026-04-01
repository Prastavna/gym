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
    expect(wrapper.text()).toContain("Hover over a muscle");
  });

  it("shows exercises when a muscle overlay is hovered", async () => {
    const wrapper = mount(MuscleMap);
    const polygon = wrapper.find("polygon");
    await polygon.trigger("mouseenter");
    expect(wrapper.text()).not.toContain("Hover over a muscle");
  });
});
