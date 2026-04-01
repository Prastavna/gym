import { ref, computed, onUnmounted } from "vue";

export function useStopwatch() {
  const elapsed = ref(0);
  const running = ref(false);
  let intervalId: ReturnType<typeof setInterval> | null = null;

  function start() {
    if (running.value) return;
    running.value = true;
    intervalId = setInterval(() => elapsed.value++, 1000);
  }

  function pause() {
    running.value = false;
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function reset() {
    pause();
    elapsed.value = 0;
  }

  function toggle() {
    if (running.value) {
      pause();
    } else {
      start();
    }
  }

  onUnmounted(() => {
    if (intervalId !== null) clearInterval(intervalId);
  });

  const formatted = computed(() => {
    const m = Math.floor(elapsed.value / 60);
    const s = elapsed.value % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  });

  return { elapsed, running, formatted, start, pause, reset, toggle };
}

export function useCountdown(onDone?: () => void) {
  const remaining = ref(0);
  const total = ref(0);
  const running = ref(false);
  let intervalId: ReturnType<typeof setInterval> | null = null;

  function start(seconds: number) {
    stop();
    total.value = seconds;
    remaining.value = seconds;
    running.value = true;
    intervalId = setInterval(() => {
      remaining.value--;
      if (remaining.value <= 0) {
        stop();
        onDone?.();
      }
    }, 1000);
  }

  function stop() {
    running.value = false;
    remaining.value = 0;
    total.value = 0;
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  onUnmounted(() => {
    if (intervalId !== null) clearInterval(intervalId);
  });

  const progress = computed(() => (total.value > 0 ? remaining.value / total.value : 0));

  const formatted = computed(() => {
    const m = Math.floor(remaining.value / 60);
    const s = remaining.value % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  });

  return { remaining, total, running, progress, formatted, start, stop };
}
