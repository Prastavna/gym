<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { mediaFallbackUrl } from "../data/muscles";

const props = defineProps<{
  src: string | null | undefined;
  alt: string;
  loading?: "lazy" | "eager";
  width?: number | string;
  height?: number | string;
}>();

// 0 = primary (jsDelivr), 1 = GitHub raw mirror, 2 = give up → placeholder.
const attempt = ref(0);
watch(
  () => props.src,
  () => (attempt.value = 0),
);

const currentSrc = computed(() => {
  if (!props.src) return null;
  if (attempt.value === 0) return props.src;
  if (attempt.value === 1) return mediaFallbackUrl(props.src);
  return null;
});

function onError() {
  attempt.value += 1;
  // No mirror for this URL → skip straight to the placeholder.
  if (attempt.value === 1 && !mediaFallbackUrl(props.src ?? "")) attempt.value = 2;
}
</script>

<template>
  <img
    v-if="currentSrc"
    :src="currentSrc"
    :alt="alt"
    crossorigin="anonymous"
    :loading="loading"
    :width="width"
    :height="height"
    @error="onError"
  />
  <div
    v-else
    role="img"
    :aria-label="`${alt} (media unavailable)`"
    class="flex aspect-square items-center justify-center text-gray-400"
  >
    <svg
      viewBox="0 0 24 24"
      class="size-1/3 max-h-12 max-w-12"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
      />
    </svg>
  </div>
</template>
