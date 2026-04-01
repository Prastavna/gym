export interface Exercise {
  name: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface Muscle {
  id: string;
  name: string;
  region: "front" | "back";
  /** SVG overlay polygon points relative to viewBox 0 0 407 355 */
  overlay: string;
  exercises: Exercise[];
}

export const muscles: Muscle[] = [
  {
    id: "pectorals",
    name: "Pectoralis Major",
    region: "front",
    overlay: "77,65 127,65 127,95 77,95",
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
    overlay: "62,55 77,55 77,85 62,85",
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
    overlay: "52,95 67,95 67,140 52,140",
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
    overlay: "47,145 64,140 70,200 52,200",
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
    overlay: "90,95 114,95 114,150 90,150",
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
    overlay: "77,95 90,95 90,150 77,145",
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
    overlay: "77,155 127,155 127,260 77,260",
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
    overlay: "82,265 122,265 120,330 84,330",
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
    overlay: "290,55 340,55 335,85 295,85",
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
    overlay: "285,85 305,85 305,140 285,130",
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
    overlay: "303,70 327,70 327,95 303,95",
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
    overlay: "265,90 285,90 285,140 265,140",
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
    overlay: "290,150 340,150 340,180 290,180",
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
    overlay: "290,185 340,185 340,260 290,260",
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
    overlay: "295,265 335,265 333,330 297,330",
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
