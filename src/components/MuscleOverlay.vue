<script setup lang="ts">
import type { Muscle } from "../data/muscles";

const props = defineProps<{
  muscles: Muscle[];
  activeMuscle: string | null;
  hoveredMuscle: string | null;
  debug?: boolean;
}>();

const emit = defineEmits<{
  hover: [muscleId: string | null];
}>();
</script>

<template>
  <svg
    viewBox="0 0 406.99 354.43"
    class="absolute inset-0 w-full h-full"
    preserveAspectRatio="xMidYMid meet"
  >
    <polygon
      v-for="muscle in muscles"
      :key="muscle.id"
      :points="muscle.overlay"
      :data-muscle="muscle.id"
      :class="[
        'muscle-zone',
        {
          active: activeMuscle === muscle.id && hoveredMuscle !== muscle.id,
          hovered: hoveredMuscle === muscle.id,
          debug: props.debug,
        },
      ]"
      @mouseenter="emit('hover', muscle.id)"
      @mouseleave="emit('hover', null)"
    >
      <title>{{ muscle.commonName }} ({{ muscle.name }})</title>
    </polygon>
  </svg>
</template>

<style scoped>
.muscle-zone {
  fill: transparent;
  stroke: transparent;
  cursor: pointer;
  transition:
    fill 0.2s,
    stroke 0.2s;
}
.muscle-zone.hovered {
  fill: rgba(59, 130, 246, 0.3);
  stroke: rgba(59, 130, 246, 0.7);
  stroke-width: 1;
}
.muscle-zone.active {
  fill: rgba(59, 130, 246, 0.15);
  stroke: rgba(59, 130, 246, 0.4);
  stroke-width: 0.5;
}
.muscle-zone.debug {
  fill: rgba(59, 130, 246, 0.08);
  stroke: rgba(59, 130, 246, 0.3);
  stroke-width: 0.5;
}
</style>
