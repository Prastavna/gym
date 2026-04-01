import { describe, expect, it, vi } from "vite-plus/test";

// We need to test the composable logic without Vue lifecycle hooks
// So we mock onUnmounted
vi.mock("vue", async () => {
  const actual = await vi.importActual("vue");
  return { ...actual, onUnmounted: vi.fn() };
});

import { useStopwatch, useCountdown } from "../composables/useTimer";

describe("useStopwatch", () => {
  it("starts at 0 and formats as 00:00", () => {
    const { elapsed, formatted } = useStopwatch();
    expect(elapsed.value).toBe(0);
    expect(formatted.value).toBe("00:00");
  });

  it("increments elapsed on start", () => {
    vi.useFakeTimers();
    const { elapsed, running, start } = useStopwatch();
    start();
    expect(running.value).toBe(true);
    vi.advanceTimersByTime(3000);
    expect(elapsed.value).toBe(3);
    vi.useRealTimers();
  });

  it("pauses and resumes", () => {
    vi.useFakeTimers();
    const { elapsed, pause, start } = useStopwatch();
    start();
    vi.advanceTimersByTime(2000);
    pause();
    vi.advanceTimersByTime(5000);
    expect(elapsed.value).toBe(2);
    start();
    vi.advanceTimersByTime(1000);
    expect(elapsed.value).toBe(3);
    vi.useRealTimers();
  });

  it("resets to 0", () => {
    vi.useFakeTimers();
    const { elapsed, running, start, reset } = useStopwatch();
    start();
    vi.advanceTimersByTime(5000);
    reset();
    expect(elapsed.value).toBe(0);
    expect(running.value).toBe(false);
    vi.useRealTimers();
  });

  it("formats minutes and seconds", () => {
    const { elapsed, formatted } = useStopwatch();
    elapsed.value = 125;
    expect(formatted.value).toBe("02:05");
  });
});

describe("useCountdown", () => {
  it("counts down from given seconds", () => {
    vi.useFakeTimers();
    const { remaining, running, start } = useCountdown();
    start(60);
    expect(running.value).toBe(true);
    expect(remaining.value).toBe(60);
    vi.advanceTimersByTime(3000);
    expect(remaining.value).toBe(57);
    vi.useRealTimers();
  });

  it("calls onDone when finished", () => {
    vi.useFakeTimers();
    const done = vi.fn();
    const { running, start } = useCountdown(done);
    start(3);
    vi.advanceTimersByTime(3000);
    expect(done).toHaveBeenCalledOnce();
    expect(running.value).toBe(false);
    vi.useRealTimers();
  });

  it("stops and resets", () => {
    vi.useFakeTimers();
    const { remaining, running, start, stop } = useCountdown();
    start(30);
    vi.advanceTimersByTime(5000);
    stop();
    expect(remaining.value).toBe(0);
    expect(running.value).toBe(false);
    vi.useRealTimers();
  });

  it("computes progress ratio", () => {
    vi.useFakeTimers();
    const { progress, start } = useCountdown();
    start(10);
    vi.advanceTimersByTime(5000);
    expect(progress.value).toBeCloseTo(0.5);
    vi.useRealTimers();
  });
});
