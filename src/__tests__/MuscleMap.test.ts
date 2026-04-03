// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vite-plus/test";
import { mount } from "@vue/test-utils";
import MuscleMap from "../components/MuscleMap.vue";

describe("MuscleMap", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-30T09:00:00.000Z"));
    window.localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

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

  it("adds an exercise to the weekly schedule and previews it for today", async () => {
    const wrapper = mount(MuscleMap);
    const polygon = wrapper.find("polygon");

    await polygon.trigger("mouseenter");

    const addToPlanButton = wrapper
      .findAll("button")
      .find((button) => button.text() === "Add to plan");
    expect(addToPlanButton).toBeDefined();
    await addToPlanButton!.trigger("click");

    const addToDayButton = wrapper
      .findAll("button")
      .find((button) => button.text() === "Add to day");
    expect(addToDayButton).toBeDefined();
    await addToDayButton!.trigger("click");

    const saveScheduleButton = wrapper
      .findAll("button")
      .find((button) => button.text() === "Save schedule");
    expect(saveScheduleButton).toBeDefined();
    await saveScheduleButton!.trigger("click");

    const previewButton = wrapper
      .findAll("button")
      .find((button) => button.text() === "Today's plan");
    expect(previewButton).toBeDefined();
    await previewButton!.trigger("click");

    expect(wrapper.text()).toContain("Today's schedule: Monday");
    expect(wrapper.text()).toContain("Bench Press");
  });

  it("offers searchable exercise suggestions while still allowing custom schedule entries", async () => {
    const wrapper = mount(MuscleMap);
    await wrapper.find("polygon").trigger("mouseenter");

    const scheduleButton = wrapper
      .findAll("button")
      .find((button) => button.text() === "Weekly schedule");
    expect(scheduleButton).toBeDefined();
    await scheduleButton!.trigger("click");

    const mondayCard = wrapper.find("[data-testid='schedule-day-monday']");
    const exerciseInput = mondayCard.findAll("input")[1];
    expect((exerciseInput.element as HTMLInputElement).placeholder).toBe(
      "Search or add a custom exercise",
    );

    const listId = (exerciseInput.element as HTMLInputElement).getAttribute("list");
    expect(listId).toBeTruthy();

    const options = wrapper.findAll(`datalist#${listId} option`);
    expect(options.some((option) => option.attributes("value") === "Bench Press")).toBe(true);

    await exerciseInput.setValue("Hill Sprints");
    const addButton = mondayCard.findAll("button").find((button) => button.text() === "Add");
    expect(addButton).toBeDefined();
    await addButton!.trigger("click");

    expect(wrapper.text()).toContain("Hill Sprints");
  });

  it("persists weekly schedule edits including cardio days", async () => {
    const wrapper = mount(MuscleMap);
    await wrapper.find("polygon").trigger("mouseenter");

    const scheduleButton = wrapper
      .findAll("button")
      .find((button) => button.text() === "Weekly schedule");
    expect(scheduleButton).toBeDefined();
    await scheduleButton!.trigger("click");

    const tuesdayCard = wrapper.find("[data-testid='schedule-day-tuesday']");
    const inputs = tuesdayCard.findAll("input");

    await tuesdayCard.find("select").setValue("cardio");
    await inputs[0].setValue("Tempo run");
    await tuesdayCard.find("textarea").setValue("Keep the pace controlled.");
    await inputs[1].setValue("Treadmill run");

    const addButton = tuesdayCard.findAll("button").find((button) => button.text() === "Add");
    expect(addButton).toBeDefined();
    await addButton!.trigger("click");

    const saveScheduleButton = wrapper
      .findAll("button")
      .find((button) => button.text() === "Save schedule");
    expect(saveScheduleButton).toBeDefined();
    await saveScheduleButton!.trigger("click");

    const secondWrapper = mount(MuscleMap);
    await secondWrapper.find("polygon").trigger("mouseenter");
    const secondScheduleButton = secondWrapper
      .findAll("button")
      .find((button) => button.text() === "Weekly schedule");
    expect(secondScheduleButton).toBeDefined();
    await secondScheduleButton!.trigger("click");

    const persistedTuesdayCard = secondWrapper.find("[data-testid='schedule-day-tuesday']");
    const persistedInputs = persistedTuesdayCard.findAll("input");

    expect((persistedTuesdayCard.find("select").element as HTMLSelectElement).value).toBe("cardio");
    expect((persistedInputs[0].element as HTMLInputElement).value).toBe("Tempo run");
    expect((persistedTuesdayCard.find("textarea").element as HTMLTextAreaElement).value).toBe(
      "Keep the pace controlled.",
    );
    expect(secondWrapper.text()).toContain("Treadmill run");
  });

  it("does not render the removed top bar summary", () => {
    const wrapper = mount(MuscleMap);

    expect(wrapper.text()).not.toContain("Planned days:");
    expect(wrapper.text()).not.toContain("Today:");
  });
});
