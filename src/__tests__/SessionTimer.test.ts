// @vitest-environment jsdom
import { describe, expect, it, vi } from "vite-plus/test";
import { mount } from "@vue/test-utils";
import SessionTimer from "../components/SessionTimer.vue";

describe("SessionTimer", () => {
  it("renders with 00:00 initially", () => {
    const wrapper = mount(SessionTimer);
    expect(wrapper.text()).toContain("00:00");
  });

  it("shows Start button initially", () => {
    const wrapper = mount(SessionTimer);
    expect(wrapper.text()).toContain("Start");
  });

  it("toggles to Pause when started", async () => {
    vi.useFakeTimers();
    const wrapper = mount(SessionTimer);
    await wrapper.find("button").trigger("click");
    expect(wrapper.text()).toContain("Pause");
    vi.useRealTimers();
  });

  it("shows Session label", () => {
    const wrapper = mount(SessionTimer);
    expect(wrapper.text()).toContain("Session");
  });
});
