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

## Commands

```bash
vp check
vp test
```
