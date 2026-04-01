# Muscle Map Interactive Website - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an interactive anatomy website with a hoverable muscle SVG on the left and related exercises displayed on the right.

**Architecture:** Vue 3 SFC components with TypeScript. The Wikipedia muscle SVG is displayed as an `<img>` on the left panel with transparent SVG overlay hotspots for each muscle group. On hover, the right panel shows exercises for the hovered muscle. Tailwind CSS for layout/styling.

**Tech Stack:** Vue 3, TypeScript, Tailwind CSS v4, Vite+, @svgdotjs/svg.js (for overlay generation), vite-plus/test (Vitest)

---

## File Structure

- `src/data/muscles.ts` — Muscle definitions (id, name, overlay polygon coordinates) and exercise mappings
- `src/components/MuscleMap.vue` — Main layout: left SVG panel + right exercise panel
- `src/components/MuscleOverlay.vue` — SVG overlay with transparent hoverable polygons
- `src/components/ExercisePanel.vue` — Right panel showing exercises for hovered muscle
- `src/App.vue` — Mount MuscleMap
- `src/__tests__/muscles.test.ts` — Data integrity tests
- `src/__tests__/MuscleMap.test.ts` — Component interaction tests

---

### Task 1: Muscle & Exercise Data Model

**Files:**

- Create: `src/data/muscles.ts`
- Create: `src/__tests__/muscles.test.ts`

- [ ] **Step 1: Write failing tests for muscle data**

```ts
// src/__tests__/muscles.test.ts
import { describe, expect, it } from "vite-plus/test";
import { muscles, getExercisesForMuscle } from "../data/muscles";

describe("muscles data", () => {
  it("has at least 10 muscle groups defined", () => {
    expect(muscles.length).toBeGreaterThanOrEqual(10);
  });

  it("each muscle has required fields", () => {
    for (const muscle of muscles) {
      expect(muscle.id).toBeTruthy();
      expect(muscle.name).toBeTruthy();
      expect(muscle.exercises.length).toBeGreaterThan(0);
      expect(muscle.region).toBeTruthy();
    }
  });

  it("each muscle has unique id", () => {
    const ids = muscles.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("getExercisesForMuscle", () => {
  it("returns exercises for a valid muscle id", () => {
    const exercises = getExercisesForMuscle("pectorals");
    expect(exercises).toBeDefined();
    expect(exercises!.length).toBeGreaterThan(0);
  });

  it("returns undefined for unknown muscle", () => {
    expect(getExercisesForMuscle("nonexistent")).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `vp test src/__tests__/muscles.test.ts`
Expected: FAIL — module not found

- [ ] **Step 3: Implement muscle data**

```ts
// src/data/muscles.ts
export interface Exercise {
  name: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface Muscle {
  id: string;
  name: string;
  region: "front" | "back";
  /** SVG overlay polygon points (percentage-based relative to viewBox) */
  overlay: string;
  exercises: Exercise[];
}

export const muscles: Muscle[] = [
  {
    id: "pectorals",
    name: "Pectoralis Major",
    region: "front",
    overlay: "19,30 28,27 30,35 28,40 19,38",
    exercises: [
      {
        name: "Bench Press",
        description:
          "Lie on a flat bench, grip the barbell shoulder-width apart, lower to chest, press up.",
        difficulty: "intermediate",
      },
      {
        name: "Push-Ups",
        description: "Plank position, lower body until chest nearly touches floor, push back up.",
        difficulty: "beginner",
      },
      {
        name: "Dumbbell Flyes",
        description:
          "Lie on bench with dumbbells above chest, lower arms in arc to sides, squeeze back up.",
        difficulty: "intermediate",
      },
    ],
  },
  {
    id: "deltoids",
    name: "Deltoids",
    region: "front",
    overlay: "15,26 19,24 21,30 19,33 15,31",
    exercises: [
      {
        name: "Overhead Press",
        description: "Press barbell or dumbbells from shoulder height to overhead.",
        difficulty: "intermediate",
      },
      {
        name: "Lateral Raises",
        description: "Raise dumbbells to the sides until arms are parallel with the floor.",
        difficulty: "beginner",
      },
      {
        name: "Front Raises",
        description: "Raise dumbbells in front of you to shoulder height.",
        difficulty: "beginner",
      },
    ],
  },
  {
    id: "biceps",
    name: "Biceps Brachii",
    region: "front",
    overlay: "13,33 16,32 17,39 14,40",
    exercises: [
      {
        name: "Barbell Curls",
        description: "Stand with barbell, curl weight up by bending elbows.",
        difficulty: "beginner",
      },
      {
        name: "Hammer Curls",
        description: "Curl dumbbells with neutral grip (palms facing each other).",
        difficulty: "beginner",
      },
      {
        name: "Concentration Curls",
        description: "Seated, curl dumbbell with elbow braced against inner thigh.",
        difficulty: "intermediate",
      },
    ],
  },
  {
    id: "forearms",
    name: "Forearms",
    region: "front",
    overlay: "12,41 15,40 16,49 13,49",
    exercises: [
      {
        name: "Wrist Curls",
        description: "Rest forearms on thighs, curl barbell using only wrists.",
        difficulty: "beginner",
      },
      {
        name: "Reverse Curls",
        description: "Curl barbell with overhand grip to target forearm extensors.",
        difficulty: "intermediate",
      },
      {
        name: "Farmer's Walk",
        description: "Carry heavy dumbbells and walk for distance or time.",
        difficulty: "beginner",
      },
    ],
  },
  {
    id: "abdominals",
    name: "Rectus Abdominis",
    region: "front",
    overlay: "22,36 27,36 27,49 22,49",
    exercises: [
      {
        name: "Crunches",
        description: "Lie on back, curl shoulders toward pelvis, lower back stays on floor.",
        difficulty: "beginner",
      },
      {
        name: "Plank",
        description: "Hold body in a straight line supported on forearms and toes.",
        difficulty: "beginner",
      },
      {
        name: "Hanging Leg Raises",
        description: "Hang from bar, raise legs to 90 degrees, lower with control.",
        difficulty: "advanced",
      },
    ],
  },
  {
    id: "obliques",
    name: "External Obliques",
    region: "front",
    overlay: "18,36 22,35 22,48 18,46",
    exercises: [
      {
        name: "Russian Twists",
        description: "Seated with torso leaned back, rotate side to side holding a weight.",
        difficulty: "intermediate",
      },
      {
        name: "Side Plank",
        description: "Support body on one forearm, keep body straight, hold position.",
        difficulty: "beginner",
      },
      {
        name: "Bicycle Crunches",
        description: "Lie on back, alternate touching elbow to opposite knee.",
        difficulty: "beginner",
      },
    ],
  },
  {
    id: "quadriceps",
    name: "Quadriceps",
    region: "front",
    overlay: "19,51 27,51 28,67 18,67",
    exercises: [
      {
        name: "Squats",
        description: "Stand with feet shoulder-width, bend knees to lower body, stand back up.",
        difficulty: "intermediate",
      },
      {
        name: "Lunges",
        description: "Step forward, lower back knee toward ground, push back to start.",
        difficulty: "beginner",
      },
      {
        name: "Leg Press",
        description: "Sit in leg press machine, push platform away by extending legs.",
        difficulty: "intermediate",
      },
    ],
  },
  {
    id: "tibialis",
    name: "Tibialis Anterior",
    region: "front",
    overlay: "20,69 25,69 24,82 21,82",
    exercises: [
      {
        name: "Toe Raises",
        description: "Stand on heels, raise toes as high as possible, lower slowly.",
        difficulty: "beginner",
      },
      {
        name: "Tibialis Raises",
        description: "Lean back against wall, raise toes off ground repeatedly.",
        difficulty: "beginner",
      },
    ],
  },
  {
    id: "trapezius",
    name: "Trapezius",
    region: "back",
    overlay: "69,25 78,30 72,37 67,37 61,30",
    exercises: [
      {
        name: "Barbell Shrugs",
        description: "Hold barbell at thighs, raise shoulders toward ears, lower slowly.",
        difficulty: "beginner",
      },
      {
        name: "Face Pulls",
        description: "Pull cable rope toward face with elbows high.",
        difficulty: "intermediate",
      },
      {
        name: "Upright Rows",
        description: "Pull barbell up along body to chin level, elbows leading.",
        difficulty: "intermediate",
      },
    ],
  },
  {
    id: "latissimus",
    name: "Latissimus Dorsi",
    region: "back",
    overlay: "61,35 68,38 69,46 63,48 58,42",
    exercises: [
      {
        name: "Pull-Ups",
        description: "Hang from bar with overhand grip, pull body up until chin clears bar.",
        difficulty: "intermediate",
      },
      {
        name: "Lat Pulldown",
        description: "Sit at cable machine, pull bar down to upper chest.",
        difficulty: "beginner",
      },
      {
        name: "Bent-Over Rows",
        description: "Hinge at hips, pull barbell to lower chest.",
        difficulty: "intermediate",
      },
    ],
  },
  {
    id: "rhomboids",
    name: "Rhomboids",
    region: "back",
    overlay: "67,32 72,32 72,38 67,38",
    exercises: [
      {
        name: "Cable Rows",
        description: "Sit at cable machine, pull handle toward torso squeezing shoulder blades.",
        difficulty: "beginner",
      },
      {
        name: "Reverse Flyes",
        description: "Bend forward, raise dumbbells to sides squeezing upper back.",
        difficulty: "intermediate",
      },
    ],
  },
  {
    id: "triceps",
    name: "Triceps Brachii",
    region: "back",
    overlay: "57,33 61,33 61,40 57,40",
    exercises: [
      {
        name: "Tricep Dips",
        description: "Support body on parallel bars, lower by bending elbows, press back up.",
        difficulty: "intermediate",
      },
      {
        name: "Skull Crushers",
        description: "Lie on bench, lower barbell to forehead by bending elbows, extend.",
        difficulty: "intermediate",
      },
      {
        name: "Tricep Pushdown",
        description: "Push cable attachment down by extending elbows.",
        difficulty: "beginner",
      },
    ],
  },
  {
    id: "glutes",
    name: "Gluteus Maximus",
    region: "back",
    overlay: "63,48 76,48 77,56 62,56",
    exercises: [
      {
        name: "Hip Thrusts",
        description: "Back against bench, drive hips up with barbell across lap.",
        difficulty: "intermediate",
      },
      {
        name: "Deadlifts",
        description: "Lift barbell from floor by extending hips and knees.",
        difficulty: "advanced",
      },
      {
        name: "Bulgarian Split Squats",
        description: "Rear foot elevated, lower front knee to 90 degrees.",
        difficulty: "intermediate",
      },
    ],
  },
  {
    id: "hamstrings",
    name: "Hamstrings",
    region: "back",
    overlay: "63,57 76,57 76,69 63,69",
    exercises: [
      {
        name: "Romanian Deadlift",
        description: "Hinge at hips with slight knee bend, lower barbell along legs.",
        difficulty: "intermediate",
      },
      {
        name: "Leg Curls",
        description: "Lie face down on machine, curl heels toward glutes.",
        difficulty: "beginner",
      },
      {
        name: "Good Mornings",
        description: "Barbell on shoulders, hinge at hips keeping back straight.",
        difficulty: "advanced",
      },
    ],
  },
  {
    id: "calves",
    name: "Gastrocnemius",
    region: "back",
    overlay: "64,70 75,70 74,82 65,82",
    exercises: [
      {
        name: "Standing Calf Raises",
        description: "Stand on edge of step, raise heels as high as possible, lower slowly.",
        difficulty: "beginner",
      },
      {
        name: "Seated Calf Raises",
        description: "Sit with weight on knees, raise heels off ground.",
        difficulty: "beginner",
      },
      {
        name: "Jump Rope",
        description: "Skip rope staying on balls of feet for calf endurance.",
        difficulty: "intermediate",
      },
    ],
  },
];

export function getExercisesForMuscle(id: string): Exercise[] | undefined {
  return muscles.find((m) => m.id === id)?.exercises;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `vp test src/__tests__/muscles.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/data/muscles.ts src/__tests__/muscles.test.ts
git commit -m "feat: add muscle data model with exercises"
```

---

### Task 2: ExercisePanel Component

**Files:**

- Create: `src/components/ExercisePanel.vue`
- Create: `src/__tests__/ExercisePanel.test.ts`

- [ ] **Step 1: Write failing test**

```ts
// src/__tests__/ExercisePanel.test.ts
import { describe, expect, it } from "vite-plus/test";
import { mount } from "@vue/test-utils";
import ExercisePanel from "../components/ExercisePanel.vue";
import type { Exercise } from "../data/muscles";

const sampleExercises: Exercise[] = [
  { name: "Bench Press", description: "Press weight up from chest.", difficulty: "intermediate" },
  { name: "Push-Ups", description: "Push body up from floor.", difficulty: "beginner" },
];

describe("ExercisePanel", () => {
  it("shows placeholder when no muscle is selected", () => {
    const wrapper = mount(ExercisePanel, { props: { muscleName: null, exercises: [] } });
    expect(wrapper.text()).toContain("Hover over a muscle");
  });

  it("displays muscle name when provided", () => {
    const wrapper = mount(ExercisePanel, {
      props: { muscleName: "Pectoralis Major", exercises: sampleExercises },
    });
    expect(wrapper.text()).toContain("Pectoralis Major");
  });

  it("renders all exercises", () => {
    const wrapper = mount(ExercisePanel, {
      props: { muscleName: "Pectoralis Major", exercises: sampleExercises },
    });
    expect(wrapper.text()).toContain("Bench Press");
    expect(wrapper.text()).toContain("Push-Ups");
  });

  it("shows difficulty badges", () => {
    const wrapper = mount(ExercisePanel, {
      props: { muscleName: "Test", exercises: sampleExercises },
    });
    expect(wrapper.text()).toContain("intermediate");
    expect(wrapper.text()).toContain("beginner");
  });
});
```

- [ ] **Step 2: Run test — verify it fails**

Run: `vp test src/__tests__/ExercisePanel.test.ts`

- [ ] **Step 3: Implement ExercisePanel.vue**

```vue
<!-- src/components/ExercisePanel.vue -->
<script setup lang="ts">
import type { Exercise } from "../data/muscles";

defineProps<{
  muscleName: string | null;
  exercises: Exercise[];
}>();

const badgeColor = (d: Exercise["difficulty"]) =>
  d === "beginner"
    ? "bg-green-100 text-green-800"
    : d === "intermediate"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-red-100 text-red-800";
</script>

<template>
  <div class="h-full p-6 overflow-y-auto">
    <div v-if="!muscleName" class="flex items-center justify-center h-full text-gray-400 text-lg">
      Hover over a muscle to see exercises
    </div>
    <div v-else>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">{{ muscleName }}</h2>
      <div class="space-y-4">
        <div
          v-for="exercise in exercises"
          :key="exercise.name"
          class="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
        >
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-semibold text-gray-700">{{ exercise.name }}</h3>
            <span
              class="text-xs font-medium px-2 py-1 rounded-full"
              :class="badgeColor(exercise.difficulty)"
            >
              {{ exercise.difficulty }}
            </span>
          </div>
          <p class="text-sm text-gray-600">{{ exercise.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
```

- [ ] **Step 4: Run tests — verify pass**

Run: `vp test src/__tests__/ExercisePanel.test.ts`

- [ ] **Step 5: Commit**

```bash
git add src/components/ExercisePanel.vue src/__tests__/ExercisePanel.test.ts
git commit -m "feat: add ExercisePanel component"
```

---

### Task 3: MuscleOverlay Component

**Files:**

- Create: `src/components/MuscleOverlay.vue`
- Create: `src/__tests__/MuscleOverlay.test.ts`

- [ ] **Step 1: Write failing test**

```ts
// src/__tests__/MuscleOverlay.test.ts
import { describe, expect, it } from "vite-plus/test";
import { mount } from "@vue/test-utils";
import MuscleOverlay from "../components/MuscleOverlay.vue";
import { muscles } from "../data/muscles";

describe("MuscleOverlay", () => {
  it("renders an SVG with polygon overlays", () => {
    const wrapper = mount(MuscleOverlay, { props: { muscles, activeMuscle: null } });
    const svg = wrapper.find("svg");
    expect(svg.exists()).toBe(true);
    const polygons = wrapper.findAll("polygon");
    expect(polygons.length).toBe(muscles.length);
  });

  it("emits hover event with muscle id on mouseenter", async () => {
    const wrapper = mount(MuscleOverlay, { props: { muscles, activeMuscle: null } });
    const polygon = wrapper.find("polygon");
    await polygon.trigger("mouseenter");
    expect(wrapper.emitted("hover")).toBeTruthy();
    expect(wrapper.emitted("hover")![0][0]).toBe(muscles[0].id);
  });

  it("emits hover with null on mouseleave", async () => {
    const wrapper = mount(MuscleOverlay, { props: { muscles, activeMuscle: null } });
    const polygon = wrapper.find("polygon");
    await polygon.trigger("mouseleave");
    expect(wrapper.emitted("hover")).toBeTruthy();
    expect(wrapper.emitted("hover")![0][0]).toBeNull();
  });

  it("highlights active muscle polygon", () => {
    const wrapper = mount(MuscleOverlay, { props: { muscles, activeMuscle: "pectorals" } });
    const polygons = wrapper.findAll("polygon");
    const pec = polygons.find((p) => p.attributes("data-muscle") === "pectorals");
    expect(pec?.classes()).toContain("active");
  });
});
```

- [ ] **Step 2: Run test — verify it fails**

Run: `vp test src/__tests__/MuscleOverlay.test.ts`

- [ ] **Step 3: Implement MuscleOverlay.vue**

```vue
<!-- src/components/MuscleOverlay.vue -->
<script setup lang="ts">
import type { Muscle } from "../data/muscles";

defineProps<{
  muscles: Muscle[];
  activeMuscle: string | null;
}>();

const emit = defineEmits<{
  hover: [muscleId: string | null];
}>();
</script>

<template>
  <svg
    viewBox="0 0 100 90"
    class="absolute inset-0 w-full h-full"
    preserveAspectRatio="xMidYMid meet"
  >
    <polygon
      v-for="muscle in muscles"
      :key="muscle.id"
      :points="muscle.overlay"
      :data-muscle="muscle.id"
      :class="['muscle-zone', { active: activeMuscle === muscle.id }]"
      @mouseenter="emit('hover', muscle.id)"
      @mouseleave="emit('hover', null)"
    />
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
.muscle-zone:hover,
.muscle-zone.active {
  fill: rgba(59, 130, 246, 0.3);
  stroke: rgba(59, 130, 246, 0.7);
  stroke-width: 0.5;
}
</style>
```

- [ ] **Step 4: Run tests — verify pass**

Run: `vp test src/__tests__/MuscleOverlay.test.ts`

- [ ] **Step 5: Commit**

```bash
git add src/components/MuscleOverlay.vue src/__tests__/MuscleOverlay.test.ts
git commit -m "feat: add MuscleOverlay component with hover hotspots"
```

---

### Task 4: MuscleMap Main Layout

**Files:**

- Create: `src/components/MuscleMap.vue`
- Modify: `src/App.vue`
- Modify: `src/style.css`
- Create: `src/__tests__/MuscleMap.test.ts`

- [ ] **Step 1: Write failing test**

```ts
// src/__tests__/MuscleMap.test.ts
import { describe, expect, it } from "vite-plus/test";
import { mount } from "@vue/test-utils";
import MuscleMap from "../components/MuscleMap.vue";

describe("MuscleMap", () => {
  it("renders left and right panels", () => {
    const wrapper = mount(MuscleMap);
    expect(wrapper.find("[data-testid='svg-panel']").exists()).toBe(true);
    expect(wrapper.find("[data-testid='exercise-panel']").exists()).toBe(true);
  });

  it("shows placeholder text in exercise panel initially", () => {
    const wrapper = mount(MuscleMap);
    expect(wrapper.text()).toContain("Hover over a muscle");
  });

  it("shows exercises when a muscle overlay is hovered", async () => {
    const wrapper = mount(MuscleMap);
    const polygon = wrapper.find("polygon");
    await polygon.trigger("mouseenter");
    // Should now display a muscle name instead of placeholder
    expect(wrapper.text()).not.toContain("Hover over a muscle");
  });
});
```

- [ ] **Step 2: Run test — verify it fails**

Run: `vp test src/__tests__/MuscleMap.test.ts`

- [ ] **Step 3: Implement MuscleMap.vue**

```vue
<!-- src/components/MuscleMap.vue -->
<script setup lang="ts">
import { ref, computed } from "vue";
import { muscles } from "../data/muscles";
import MuscleOverlay from "./MuscleOverlay.vue";
import ExercisePanel from "./ExercisePanel.vue";

const activeMuscleId = ref<string | null>(null);

const activeMuscle = computed(() => muscles.find((m) => m.id === activeMuscleId.value) ?? null);

function onHover(id: string | null) {
  activeMuscleId.value = id;
}
</script>

<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Left: SVG Panel -->
    <div data-testid="svg-panel" class="w-1/2 flex items-center justify-center relative p-4">
      <div class="relative w-full max-w-2xl">
        <img src="/muscles.svg" alt="Human muscle anatomy" class="w-full h-auto" />
        <MuscleOverlay :muscles="muscles" :active-muscle="activeMuscleId" @hover="onHover" />
      </div>
    </div>
    <!-- Right: Exercise Panel -->
    <div data-testid="exercise-panel" class="w-1/2 bg-white border-l border-gray-200">
      <ExercisePanel
        :muscle-name="activeMuscle?.name ?? null"
        :exercises="activeMuscle?.exercises ?? []"
      />
    </div>
  </div>
</template>
```

- [ ] **Step 4: Update App.vue**

```vue
<!-- src/App.vue -->
<script setup lang="ts">
import MuscleMap from "./components/MuscleMap.vue";
</script>

<template>
  <MuscleMap />
</template>
```

- [ ] **Step 5: Update style.css for full-height body**

```css
/* src/style.css */
@import "tailwindcss";

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  height: 100%;
}
```

- [ ] **Step 6: Run all tests**

Run: `vp test`
Expected: All pass

- [ ] **Step 7: Commit**

```bash
git add src/components/MuscleMap.vue src/components/ExercisePanel.vue src/components/MuscleOverlay.vue src/App.vue src/style.css src/__tests__/MuscleMap.test.ts
git commit -m "feat: wire up MuscleMap layout with SVG overlay and exercise panel"
```

---

### Task 5: Visual Polish & Overlay Calibration

**Files:**

- Modify: `src/data/muscles.ts` (tune overlay coordinates)
- Modify: `src/components/MuscleOverlay.vue` (labels on hover)
- Modify: `src/components/ExercisePanel.vue` (styling polish)

- [ ] **Step 1: Run dev server and visually calibrate overlay positions**

Run: `vp dev`
Open browser, adjust polygon coordinates in `muscles.ts` to align with the SVG anatomy diagram.

- [ ] **Step 2: Add muscle name tooltip on hover**

Add a `<title>` element inside each polygon for native browser tooltip.

- [ ] **Step 3: Run all tests and verify nothing broke**

Run: `vp test`

- [ ] **Step 4: Commit**

```bash
git add -u
git commit -m "feat: polish overlay positions and add hover tooltips"
```

---

### Task 6: Install test dependencies and cleanup

**Files:**

- Modify: `package.json` (add @vue/test-utils)
- Delete: `src/components/HelloWorld.vue`

- [ ] **Step 1: Install @vue/test-utils**

Run: `vp add -D @vue/test-utils`

- [ ] **Step 2: Delete HelloWorld.vue**

- [ ] **Step 3: Commit**

```bash
git add -u package.json bun.lock
git commit -m "chore: add test deps, remove boilerplate"
```
