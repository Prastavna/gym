<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  title: string;
  description?: string;
  defaultOpen?: boolean;
  contentClass?: string;
}>();

const isOpen = ref(props.defaultOpen ?? false);
const panelId = `accordion-panel-${Math.random().toString(36).slice(2, 10)}`;

function toggle() {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <section class="rounded-3xl border border-slate-200 bg-slate-50 h-fit">
    <div class="flex items-start gap-3 p-4">
      <button
        type="button"
        class="flex min-w-0 flex-1 items-start justify-between gap-3 text-left"
        :aria-controls="panelId"
        :aria-expanded="isOpen"
        @click="toggle"
      >
        <div class="min-w-0">
          <h3 class="text-lg font-semibold text-slate-900">{{ title }}</h3>
          <p v-if="description" class="text-sm text-slate-500">{{ description }}</p>
        </div>
        <svg
          viewBox="0 0 20 20"
          class="mt-0.5 size-5 shrink-0 text-slate-400 transition-transform"
          :class="isOpen ? 'rotate-180' : ''"
          aria-hidden="true"
        >
          <path
            d="M5.25 7.5 10 12.25 14.75 7.5"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.8"
          />
        </svg>
      </button>
      <slot name="actions" :open="isOpen" />
    </div>

    <div
      v-show="isOpen"
      :id="panelId"
      :class="contentClass ?? 'border-t border-slate-200 p-4'"
      role="region"
    >
      <slot :open="isOpen" />
    </div>
  </section>
</template>
