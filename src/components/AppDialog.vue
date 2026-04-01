<script setup lang="ts">
defineProps<{
  title: string;
  description?: string;
  widthClass?: string;
}>();

const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
    @click.self="emit('close')"
  >
    <div
      :class="widthClass ?? 'max-w-5xl'"
      class="w-full max-h-[90vh] overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl"
      role="dialog"
      aria-modal="true"
      :aria-label="title"
    >
      <div class="flex items-start justify-between border-b border-slate-200 px-6 py-5">
        <div>
          <h2 class="text-xl font-semibold text-slate-900">{{ title }}</h2>
          <p v-if="description" class="mt-1 text-sm text-slate-500">{{ description }}</p>
        </div>
        <button
          type="button"
          class="rounded-full border border-slate-200 px-3 py-1 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
          @click="emit('close')"
        >
          Close
        </button>
      </div>
      <div class="max-h-[calc(90vh-88px)] overflow-y-auto">
        <slot />
      </div>
    </div>
  </div>
</template>
