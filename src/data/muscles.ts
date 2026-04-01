export interface Exercise {
  name: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface Muscle {
  id: string;
  name: string;
  commonName: string;
  region: "front" | "back";
  /** SVG overlay polygon points relative to viewBox 0 0 407 355 */
  overlay: string;
  exercises: Exercise[];
}

export const muscles: Muscle[] = [
  {
    id: "pectorals",
    name: "Pectoralis Major",
    commonName: "Chest",
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
      {
        name: "Incline Bench Press",
        description: "Press barbell on a 30-45 degree incline bench to target upper chest.",
        difficulty: "intermediate",
      },
      {
        name: "Cable Crossovers",
        description:
          "Stand between cable pulleys, bring handles together in front of chest in a hugging motion.",
        difficulty: "intermediate",
      },
      {
        name: "Chest Dips",
        description: "Lean forward on parallel bars, lower body by bending elbows, press back up.",
        difficulty: "advanced",
      },
    ],
  },
  {
    id: "deltoids",
    name: "Deltoids",
    commonName: "Shoulders",
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
      {
        name: "Arnold Press",
        description:
          "Start with palms facing you, rotate outward while pressing dumbbells overhead.",
        difficulty: "intermediate",
      },
      {
        name: "Reverse Pec Deck",
        description: "Sit facing the machine pad, push handles backward squeezing rear delts.",
        difficulty: "beginner",
      },
      {
        name: "Landmine Press",
        description:
          "Press the end of a barbell anchored at the floor upward and forward at an angle.",
        difficulty: "intermediate",
      },
    ],
  },
  {
    id: "biceps",
    name: "Biceps Brachii",
    commonName: "Biceps",
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
      {
        name: "Incline Dumbbell Curls",
        description:
          "Sit on incline bench, curl dumbbells with arms hanging straight down to stretch the bicep.",
        difficulty: "intermediate",
      },
      {
        name: "Preacher Curls",
        description: "Rest upper arms on preacher bench pad, curl barbell or EZ-bar upward.",
        difficulty: "intermediate",
      },
      {
        name: "Chin-Ups",
        description: "Hang from bar with underhand grip, pull body up until chin clears bar.",
        difficulty: "advanced",
      },
    ],
  },
  {
    id: "forearms",
    name: "Brachioradialis & Flexors",
    commonName: "Forearms",
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
      {
        name: "Plate Pinch Hold",
        description: "Pinch two weight plates together smooth-side-out and hold for time.",
        difficulty: "intermediate",
      },
      {
        name: "Towel Hang",
        description: "Drape a towel over a pull-up bar and hang from it to build grip strength.",
        difficulty: "advanced",
      },
    ],
  },
  {
    id: "abdominals",
    name: "Rectus Abdominis",
    commonName: "Abs",
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
      {
        name: "Ab Wheel Rollout",
        description: "Kneel on floor, roll ab wheel forward extending body, pull back to start.",
        difficulty: "advanced",
      },
      {
        name: "Cable Crunch",
        description: "Kneel below a high cable pulley, crunch downward against resistance.",
        difficulty: "intermediate",
      },
      {
        name: "Dead Bug",
        description:
          "Lie on back, extend opposite arm and leg while keeping lower back pressed to floor.",
        difficulty: "beginner",
      },
    ],
  },
  {
    id: "obliques",
    name: "External Obliques",
    commonName: "Side Abs",
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
      {
        name: "Woodchoppers",
        description:
          "Pull cable or weight diagonally across body from high to low in a chopping motion.",
        difficulty: "intermediate",
      },
      {
        name: "Pallof Press",
        description: "Stand sideways to cable, press handle straight out and resist rotation.",
        difficulty: "intermediate",
      },
    ],
  },
  {
    id: "quadriceps",
    name: "Quadriceps Femoris",
    commonName: "Quads / Thighs",
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
      {
        name: "Leg Extensions",
        description: "Sit in machine, extend legs to straighten knees against resistance.",
        difficulty: "beginner",
      },
      {
        name: "Front Squats",
        description: "Hold barbell at front of shoulders, squat down keeping torso upright.",
        difficulty: "advanced",
      },
      {
        name: "Wall Sit",
        description: "Lean against wall with thighs parallel to the floor and hold the position.",
        difficulty: "beginner",
      },
    ],
  },
  {
    id: "tibialis",
    name: "Tibialis Anterior",
    commonName: "Shins",
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
      {
        name: "Banded Dorsiflexion",
        description: "Sit with band around foot, flex toes toward shin against band resistance.",
        difficulty: "beginner",
      },
      {
        name: "Heel Walks",
        description: "Walk on your heels with toes off the ground for distance.",
        difficulty: "beginner",
      },
    ],
  },
  {
    id: "trapezius",
    name: "Trapezius",
    commonName: "Traps",
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
      {
        name: "Dumbbell Shrugs",
        description: "Hold dumbbells at sides, shrug shoulders up and squeeze at top.",
        difficulty: "beginner",
      },
      {
        name: "Rack Pulls",
        description: "Deadlift from elevated pins just below the knee to emphasize upper back.",
        difficulty: "advanced",
      },
    ],
  },
  {
    id: "latissimus",
    name: "Latissimus Dorsi",
    commonName: "Lats / Mid-Back",
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
      {
        name: "Single-Arm Dumbbell Row",
        description: "Brace one hand on bench, row dumbbell to hip with the other arm.",
        difficulty: "beginner",
      },
      {
        name: "T-Bar Row",
        description: "Straddle a landmine bar, row the weighted end toward your chest.",
        difficulty: "intermediate",
      },
      {
        name: "Straight-Arm Pulldown",
        description: "Stand at cable machine, pull bar down to thighs with arms straight.",
        difficulty: "intermediate",
      },
    ],
  },
  {
    id: "rhomboids",
    name: "Rhomboids",
    commonName: "Upper Inner Back",
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
      {
        name: "Band Pull-Aparts",
        description:
          "Hold resistance band at shoulder width, pull apart until arms are extended to sides.",
        difficulty: "beginner",
      },
      {
        name: "Prone Y Raise",
        description: "Lie face down, raise arms in a Y shape overhead squeezing shoulder blades.",
        difficulty: "beginner",
      },
    ],
  },
  {
    id: "triceps",
    name: "Triceps Brachii",
    commonName: "Triceps",
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
      {
        name: "Overhead Tricep Extension",
        description: "Hold dumbbell overhead with both hands, lower behind head, extend back up.",
        difficulty: "beginner",
      },
      {
        name: "Close-Grip Bench Press",
        description: "Bench press with hands shoulder-width apart to emphasize triceps.",
        difficulty: "intermediate",
      },
      {
        name: "Diamond Push-Ups",
        description: "Push-ups with hands close together forming a diamond shape under chest.",
        difficulty: "intermediate",
      },
    ],
  },
  {
    id: "glutes",
    name: "Gluteus Maximus",
    commonName: "Glutes / Butt",
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
      {
        name: "Glute Bridges",
        description: "Lie on back with knees bent, drive hips up squeezing glutes at the top.",
        difficulty: "beginner",
      },
      {
        name: "Cable Kickbacks",
        description: "Attach ankle cuff to low cable, kick leg straight back squeezing glute.",
        difficulty: "beginner",
      },
      {
        name: "Step-Ups",
        description: "Step onto a box or bench with one leg, drive through heel to stand up.",
        difficulty: "beginner",
      },
    ],
  },
  {
    id: "hamstrings",
    name: "Biceps Femoris",
    commonName: "Hamstrings",
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
      {
        name: "Nordic Hamstring Curl",
        description: "Kneel with feet anchored, slowly lower body forward, then curl back up.",
        difficulty: "advanced",
      },
      {
        name: "Kettlebell Swing",
        description:
          "Hinge at hips, swing kettlebell between legs and up to chest height with hip drive.",
        difficulty: "intermediate",
      },
      {
        name: "Sumo Deadlift",
        description: "Wide stance deadlift with hands inside the knees, drive through hips.",
        difficulty: "intermediate",
      },
    ],
  },
  {
    id: "calves",
    name: "Gastrocnemius & Soleus",
    commonName: "Calves",
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
      {
        name: "Donkey Calf Raises",
        description: "Bend at hips with weight on back, raise heels off a platform.",
        difficulty: "intermediate",
      },
      {
        name: "Single-Leg Calf Raise",
        description: "Stand on one foot on a step edge, raise and lower heel for isolation.",
        difficulty: "intermediate",
      },
    ],
  },
];

export function getExercisesForMuscle(id: string): Exercise[] | undefined {
  return muscles.find((m) => m.id === id)?.exercises;
}
