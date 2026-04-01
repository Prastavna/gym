// @vitest-environment jsdom
import { describe, expect, it } from "vite-plus/test";
import { mount } from "@vue/test-utils";
import MuscleOverlay from "../components/MuscleOverlay.vue";
import { muscles } from "../data/muscles";

describe("MuscleOverlay", () => {
  it("renders an SVG with polygon overlays", () => {
    const wrapper = mount(MuscleOverlay, {
      props: { muscles, activeMuscle: null, hoveredMuscle: null },
    });
    const svg = wrapper.find("svg");
    expect(svg.exists()).toBe(true);
    const polygons = wrapper.findAll("polygon");
    expect(polygons.length).toBe(muscles.length);
  });

  it("emits hover event with muscle id on mouseenter", async () => {
    const wrapper = mount(MuscleOverlay, {
      props: { muscles, activeMuscle: null, hoveredMuscle: null },
    });
    const polygon = wrapper.find("polygon");
    await polygon.trigger("mouseenter");
    expect(wrapper.emitted("hover")).toBeTruthy();
    expect(wrapper.emitted("hover")![0][0]).toBe(muscles[0].id);
  });

  it("emits hover with null on mouseleave", async () => {
    const wrapper = mount(MuscleOverlay, {
      props: { muscles, activeMuscle: null, hoveredMuscle: null },
    });
    const polygon = wrapper.find("polygon");
    await polygon.trigger("mouseleave");
    expect(wrapper.emitted("hover")).toBeTruthy();
    expect(wrapper.emitted("hover")![0][0]).toBeNull();
  });

  it("emits select on click", async () => {
    const wrapper = mount(MuscleOverlay, {
      props: { muscles, activeMuscle: null, hoveredMuscle: null },
    });
    const polygon = wrapper.find("polygon");
    await polygon.trigger("click");
    expect(wrapper.emitted("select")).toBeTruthy();
    expect(wrapper.emitted("select")![0][0]).toBe(muscles[0].id);
  });

  it("highlights active muscle polygon", () => {
    const wrapper = mount(MuscleOverlay, {
      props: { muscles, activeMuscle: "pectorals", hoveredMuscle: null },
    });
    const polygons = wrapper.findAll("polygon");
    const pec = polygons.find((p) => p.attributes("data-muscle") === "pectorals");
    expect(pec?.classes()).toContain("active");
  });

  it("highlights hovered muscle polygon", () => {
    const wrapper = mount(MuscleOverlay, {
      props: { muscles, activeMuscle: null, hoveredMuscle: "biceps" },
    });
    const polygons = wrapper.findAll("polygon");
    const bicep = polygons.find((p) => p.attributes("data-muscle") === "biceps");
    expect(bicep?.classes()).toContain("hovered");
  });
});
