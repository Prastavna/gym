# Muscle Map

Interactive muscle map for browsing exercises and building a weekly gym schedule.

## What I added

- Weekly schedule editor opened in a dialog to keep the main screen uncluttered.
- Per-day planning with `workout`, `rest`, `cardio`, `mobility`, and `custom` day types.
- Exercise planning for each day, including quick-add from the exercise panel and manual custom exercises.
- A `Preview today's plan` action placed beside the session timer inside the exercise panel.
- Local storage persistence using the `muscle-map.weekly-schedule` key.

## How it works

- Use the muscle map to browse exercises by muscle group.
- Click `Add to plan` on any exercise card to open the weekly schedule dialog with that exercise ready to place on a day.
- Use `Weekly schedule` beside the session timer to edit the whole week, add notes, mark rest/cardio days, or clear a day.
- Use `Preview today's plan` beside the session timer to quickly check what is scheduled for the current day.

## Files changed

- `src/composables/useWeeklySchedule.ts`: local-storage backed weekly schedule model and helpers.
- `src/components/ScheduleDialog.vue`: weekly schedule editor dialog.
- `src/components/TodayScheduleDialog.vue`: compact preview of today's saved plan.
- `src/components/ExercisePanelToolbar.vue`: session timer toolbar with schedule actions.
- `src/components/ExercisePanel.vue`: quick-add action for exercises.
- `src/components/MuscleMap.vue`: schedule state and dialog wiring.

## Tests

- `src/__tests__/useWeeklySchedule.test.ts`: verifies local storage save/load behavior and invalid-storage fallback.
- `src/__tests__/MuscleMap.test.ts`: verifies schedule dialog flows, today's preview, and persistence through remounts.

## Exercise dataset

The exercise catalog is augmented with the community
[`hasaneyldrm/exercises-dataset`](https://github.com/hasaneyldrm/exercises-dataset)
(1,300+ exercises with step-by-step instructions, equipment, thumbnails and
animated demos, © [Gym Visual](https://gymvisual.com/)).

- Hand-curated exercises (with video resources) are kept and win on name
  collisions; dataset exercises are merged in per muscle, deduped by name.
- Each dataset exercise is mapped to a muscle via its `target` field; muscles
  the `target` vocabulary misses (e.g. obliques) fall back to `muscle_group` /
  `secondary_muscles` matching (`FALLBACK_TOKENS` in `src/data/muscles.ts`).
- The dataset carries no difficulty rating, so difficulty is derived from
  equipment (bodyweight → beginner, machines → intermediate, barbell/weighted →
  advanced).
- Thumbnails and animated GIFs are served straight from GitHub raw URLs; no
  media is vendored into the repo. Clicking a thumbnail opens the animated demo
  and instructions in a modal.
- The dataset is **code-split** into its own chunk and loaded on demand
  (`loadExerciseCatalog()` in `src/data/muscles.ts`, wired through the
  `useExerciseCatalog` composable). The app first paints with the curated
  catalog, then reactively swaps in the augmented one once the chunk resolves,
  keeping it out of the main bundle.

The generated data lives in `src/data/exercises.dataset.ts` (auto-generated —
do not edit by hand). Regenerate it with:

```bash
node scripts/build-exercises.mjs            # downloads the latest dataset
node scripts/build-exercises.mjs ./exercises.json   # or build from a local copy
```

## Commands

```bash
vp check
vp test
```

## Google Analytics

- GA is enabled only when `VITE_GA_MEASUREMENT_ID` is set at build time.
- Leave it unset to keep analytics disabled.
- Because this is a static Vite build, changing the GA ID requires a rebuild and redeploy.

### Local build

```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX vp build
```

### Docker build

```bash
docker build \
  --build-arg VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX \
  -t muscle-map .
```

### Coolify

- Add `VITE_GA_MEASUREMENT_ID` as a build variable in Coolify.
- Redeploy after saving it so the static bundle is rebuilt with the GA snippet enabled.
- If you do not want analytics, leave that build variable empty or unset.

### GitHub Pages

- Add `VITE_GA_MEASUREMENT_ID` as an environment variable in the `github-pages` environment.
- The Pages workflow must expose that variable to the build job so Vite can inject it into `index.html` during `vp build`.
- Redeploy after saving the environment variable.
