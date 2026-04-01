// @vitest-environment jsdom
import { describe, expect, it, vi } from "vite-plus/test";
import { mount } from "@vue/test-utils";
import RestTimer from "../components/RestTimer.vue";

describe("RestTimer", () => {
  it("shows preset buttons when idle", () => {
    const wrapper = mount(RestTimer, { props: { active: false } });
    expect(wrapper.text()).toContain("30s");
    expect(wrapper.text()).toContain("60s");
    expect(wrapper.text()).toContain("90s");
  });

  it("starts countdown on preset click and emits start", async () => {
    vi.useFakeTimers();
    const wrapper = mount(RestTimer, { props: { active: false } });
    const btn = wrapper.findAll("button").find((b) => b.text() === "60s");
    await btn!.trigger("click");
    expect(wrapper.emitted("start")).toBeTruthy();
    expect(wrapper.text()).toContain("Cancel");
    vi.useRealTimers();
  });

  it("shows cancel button while running", async () => {
    vi.useFakeTimers();
    const wrapper = mount(RestTimer, { props: { active: true } });
    const btn = wrapper.findAll("button").find((b) => b.text() === "30s");
    await btn!.trigger("click");
    expect(wrapper.text()).toContain("Cancel");
    vi.useRealTimers();
  });

  it("emits done when countdown finishes", async () => {
    vi.useFakeTimers();
    const wrapper = mount(RestTimer, { props: { active: false } });
    const btn = wrapper.findAll("button").find((b) => b.text() === "30s");
    await btn!.trigger("click");
    vi.advanceTimersByTime(30000);
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("done")).toBeTruthy();
    expect(wrapper.text()).toContain("Rest complete");
    vi.useRealTimers();
  });
});
