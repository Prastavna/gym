export interface Resource {
  type: "video" | "blog";
  link: string;
  text: string;
}

export interface Exercise {
  name: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  resources: Resource[];
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
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/watch?v=rxD321l2svE",
            text: "Starting Strength: How to Bench Press",
          },
        ],
      },
      {
        name: "Push-Ups",
        description: "Plank position, lower body until chest nearly touches floor, push back up.",
        difficulty: "beginner",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=perfect+push+up+guide",
            text: "How to Do a Perfect Push-Up",
          },
        ],
      },
      {
        name: "Dumbbell Flyes",
        description:
          "Lie on bench with dumbbells above chest, lower arms in arc to sides, squeeze back up.",
        difficulty: "intermediate",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=dumbbell+flyes+form+guide",
            text: "Dumbbell Flyes Form Guide",
          },
        ],
      },
      {
        name: "Incline Bench Press",
        description: "Press barbell on a 30-45 degree incline bench to target upper chest.",
        difficulty: "intermediate",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=incline+bench+press+tutorial",
            text: "Incline Bench Press Tutorial",
          },
        ],
      },
      {
        name: "Cable Crossovers",
        description:
          "Stand between cable pulleys, bring handles together in front of chest in a hugging motion.",
        difficulty: "intermediate",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=cable+crossover+form+guide",
            text: "Cable Crossovers Guide",
          },
        ],
      },
      {
        name: "Chest Dips",
        description: "Lean forward on parallel bars, lower body by bending elbows, press back up.",
        difficulty: "advanced",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=chest+dips+exercise+guide",
            text: "How to do Chest Dips Safely",
          },
        ],
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
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=overhead+press+form+tutorial",
            text: "Overhead Press Form Tutorial",
          },
        ],
      },
      {
        name: "Lateral Raises",
        description: "Raise dumbbells to the sides until arms are parallel with the floor.",
        difficulty: "beginner",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=lateral+raises+mistakes+to+avoid",
            text: "Lateral Raises: Mistakes to Avoid",
          },
        ],
      },
      {
        name: "Front Raises",
        description: "Raise dumbbells in front of you to shoulder height.",
        difficulty: "beginner",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=dumbbell+front+raise+tutorial",
            text: "Dumbbell Front Raise Guide",
          },
        ],
      },
      {
        name: "Arnold Press",
        description:
          "Start with palms facing you, rotate outward while pressing dumbbells overhead.",
        difficulty: "intermediate",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=arnold+press+guide",
            text: "The Arnold Press Execution",
          },
        ],
      },
      {
        name: "Reverse Pec Deck",
        description: "Sit facing the machine pad, push handles backward squeezing rear delts.",
        difficulty: "beginner",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=reverse+pec+deck+rear+delt+fly",
            text: "Targeting Rear Delts with Reverse Pec Deck",
          },
        ],
      },
      {
        name: "Landmine Press",
        description:
          "Press the end of a barbell anchored at the floor upward and forward at an angle.",
        difficulty: "intermediate",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=landmine+press+shoulder+exercise",
            text: "Landmine Press Tutorial",
          },
        ],
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
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=perfect+barbell+curl+form",
            text: "Perfect Barbell Curl Form",
          },
        ],
      },
      {
        name: "Hammer Curls",
        description: "Curl dumbbells with neutral grip (palms facing each other).",
        difficulty: "beginner",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=hammer+curls+form+guide",
            text: "Hammer Curls Guide",
          },
        ],
      },
      {
        name: "Concentration Curls",
        description: "Seated, curl dumbbell with elbow braced against inner thigh.",
        difficulty: "intermediate",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=how+to+do+concentration+curls",
            text: "Proper Concentration Curl Technique",
          },
        ],
      },
      {
        name: "Incline Dumbbell Curls",
        description:
          "Sit on incline bench, curl dumbbells with arms hanging straight down to stretch the bicep.",
        difficulty: "intermediate",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=incline+dumbbell+curl+tutorial",
            text: "Incline Dumbbell Curls Guide",
          },
        ],
      },
      {
        name: "Preacher Curls",
        description: "Rest upper arms on preacher bench pad, curl barbell or EZ-bar upward.",
        difficulty: "intermediate",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=preacher+curls+proper+form",
            text: "Preacher Curls: Proper Form",
          },
        ],
      },
      {
        name: "Chin-Ups",
        description: "Hang from bar with underhand grip, pull body up until chin clears bar.",
        difficulty: "advanced",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=chin+ups+vs+pull+ups+guide",
            text: "Mastering the Chin-Up",
          },
        ],
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
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=wrist+curls+forearm+exercise",
            text: "Wrist Curls Guide",
          },
        ],
      },
      {
        name: "Reverse Curls",
        description: "Curl barbell with overhand grip to target forearm extensors.",
        difficulty: "intermediate",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=reverse+barbell+curl+tutorial",
            text: "Reverse Curls for Forearms",
          },
        ],
      },
      {
        name: "Farmer's Walk",
        description: "Carry heavy dumbbells and walk for distance or time.",
        difficulty: "beginner",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=farmers+walk+benefits+and+form",
            text: "The Farmer's Walk Masterclass",
          },
        ],
      },
      {
        name: "Plate Pinch Hold",
        description: "Pinch two weight plates together smooth-side-out and hold for time.",
        difficulty: "intermediate",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=plate+pinch+grip+strength",
            text: "Plate Pinch for Grip Strength",
          },
        ],
      },
      {
        name: "Towel Hang",
        description: "Drape a towel over a pull-up bar and hang from it to build grip strength.",
        difficulty: "advanced",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=towel+hang+grip+training",
            text: "Towel Hang Grip Training",
          },
        ],
      },
      {
        name: "Reverse Wrist Curls",
        description:
          "Rest forearms on a bench, lift the backs of the hands upward to train extensors.",
        difficulty: "beginner",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=reverse+wrist+curls+form",
            text: "Reverse Wrist Curls Form",
          },
        ],
      },
      {
        name: "Wrist Roller",
        description: "Roll a weight up and down with a wrist roller, keeping the shoulders steady.",
        difficulty: "intermediate",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=wrist+roller+forearm+exercise",
            text: "Wrist Roller Forearm Exercise",
          },
        ],
      },
      {
        name: "Behind-the-Back Wrist Curls",
        description:
          "Hold a barbell behind the hips and curl the wrists upward for a strong forearm pump.",
        difficulty: "intermediate",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=behind+the+back+wrist+curls",
            text: "Behind-the-Back Wrist Curls",
          },
        ],
      },
      {
        name: "Fat Grip Holds",
        description:
          "Hold heavy dumbbells or bars with thick grips to challenge crushing grip strength.",
        difficulty: "intermediate",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=fat+grip+holds+forearms",
            text: "Fat Grip Holds for Forearms",
          },
        ],
      },
      {
        name: "Dead Hangs",
        description:
          "Hang from a pull-up bar for time while keeping shoulders packed and grip firm.",
        difficulty: "beginner",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=dead+hang+grip+strength",
            text: "Dead Hang Grip Strength Guide",
          },
        ],
      },
      {
        name: "Finger Curls",
        description:
          "Let a barbell roll to the fingertips, then curl it back into the palm and flex the wrist.",
        difficulty: "advanced",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=barbell+finger+curls+forearms",
            text: "Barbell Finger Curls",
          },
        ],
      },
    ],
  },
  {
    id: "neck",
    name: "Sternocleidomastoid & Cervical Flexors",
    commonName: "Neck",
    region: "front",
    overlay: "95,35 110,35 112,55 93,55",
    exercises: [
      {
        name: "Chin Tucks",
        description:
          "Draw the chin straight back to train deep neck flexors without tipping the head up.",
        difficulty: "beginner",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=chin+tucks+neck+exercise",
            text: "Chin Tucks Neck Exercise",
          },
        ],
      },
      {
        name: "Neck Flexion",
        description: "Lying or with a harness, raise the head forward under light control.",
        difficulty: "intermediate",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=neck+flexion+exercise+form",
            text: "Neck Flexion Form",
          },
        ],
      },
      {
        name: "Neck Extension",
        description: "Lift the head backward against light resistance while keeping motion smooth.",
        difficulty: "intermediate",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=neck+extension+exercise+form",
            text: "Neck Extension Form",
          },
        ],
      },
      {
        name: "Lateral Neck Flexion",
        description:
          "Tilt the ear toward the shoulder against light resistance to build side-neck strength.",
        difficulty: "intermediate",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=lateral+neck+flexion+exercise",
            text: "Lateral Neck Flexion Exercise",
          },
        ],
      },
      {
        name: "Neck Harness Extensions",
        description:
          "Use a neck harness to strengthen the posterior neck through a controlled range.",
        difficulty: "advanced",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=neck+harness+extensions",
            text: "Neck Harness Extensions",
          },
        ],
      },
      {
        name: "Band Resisted Neck Rotations",
        description:
          "Rotate the head gently against a light band to train controlled turning strength.",
        difficulty: "intermediate",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=band+resisted+neck+rotation",
            text: "Band Resisted Neck Rotation",
          },
        ],
      },
      {
        name: "Isometric Neck Press",
        description:
          "Press the head into the hands from the front, back, and sides without moving the neck.",
        difficulty: "beginner",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=isometric+neck+exercise",
            text: "Isometric Neck Exercise",
          },
        ],
      },
      {
        name: "Wrestler Bridges",
        description:
          "Bridge carefully on the head and feet to build neck resilience and extension strength.",
        difficulty: "advanced",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=wrestler+bridge+neck+exercise",
            text: "Wrestler Bridge Progression",
          },
        ],
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
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=how+to+do+crunches+properly",
            text: "How to Do Crunches Properly",
          },
        ],
      },
      {
        name: "Plank",
        description: "Hold body in a straight line supported on forearms and toes.",
        difficulty: "beginner",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=proper+plank+form+for+beginners",
            text: "Proper Plank Form for Beginners",
          },
        ],
      },
      {
        name: "Hanging Leg Raises",
        description: "Hang from bar, raise legs to 90 degrees, lower with control.",
        difficulty: "advanced",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=hanging+leg+raises+form+guide",
            text: "Hanging Leg Raises Guide",
          },
        ],
      },
      {
        name: "Ab Wheel Rollout",
        description: "Kneel on floor, roll ab wheel forward extending body, pull back to start.",
        difficulty: "advanced",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=ab+wheel+rollout+progression",
            text: "Ab Wheel Rollout Progression",
          },
        ],
      },
      {
        name: "Cable Crunch",
        description: "Kneel below a high cable pulley, crunch downward against resistance.",
        difficulty: "intermediate",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=kneeling+cable+crunch+tutorial",
            text: "Kneeling Cable Crunch Tutorial",
          },
        ],
      },
      {
        name: "Dead Bug",
        description:
          "Lie on back, extend opposite arm and leg while keeping lower back pressed to floor.",
        difficulty: "beginner",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=dead+bug+exercise+form",
            text: "Dead Bug Exercise Guide",
          },
        ],
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
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=russian+twist+form+guide",
            text: "Russian Twist Form Guide",
          },
        ],
      },
      {
        name: "Side Plank",
        description: "Support body on one forearm, keep body straight, hold position.",
        difficulty: "beginner",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=side+plank+tutorial+abs",
            text: "Side Plank Tutorial",
          },
        ],
      },
      {
        name: "Bicycle Crunches",
        description: "Lie on back, alternate touching elbow to opposite knee.",
        difficulty: "beginner",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=proper+bicycle+crunches",
            text: "Proper Bicycle Crunch Execution",
          },
        ],
      },
      {
        name: "Woodchoppers",
        description:
          "Pull cable or weight diagonally across body from high to low in a chopping motion.",
        difficulty: "intermediate",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=cable+woodchoppers+guide",
            text: "Cable Woodchoppers Guide",
          },
        ],
      },
      {
        name: "Pallof Press",
        description: "Stand sideways to cable, press handle straight out and resist rotation.",
        difficulty: "intermediate",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=pallof+press+guide",
            text: "Pallof Press for Core Stability",
          },
        ],
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
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/watch?v=LmFitmO_ANw",
            text: "How to Squat Properly for Beginners",
          },
        ],
      },
      {
        name: "Lunges",
        description: "Step forward, lower back knee toward ground, push back to start.",
        difficulty: "beginner",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=how+to+do+lunges+properly",
            text: "How to Do Lunges Properly",
          },
        ],
      },
      {
        name: "Leg Press",
        description: "Sit in leg press machine, push platform away by extending legs.",
        difficulty: "intermediate",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=leg+press+mistakes+and+guide",
            text: "Leg Press Form & Common Mistakes",
          },
        ],
      },
      {
        name: "Leg Extensions",
        description: "Sit in machine, extend legs to straighten knees against resistance.",
        difficulty: "beginner",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=leg+extensions+setup+tutorial",
            text: "Leg Extensions Setup Tutorial",
          },
        ],
      },
      {
        name: "Front Squats",
        description: "Hold barbell at front of shoulders, squat down keeping torso upright.",
        difficulty: "advanced",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=front+squat+grip+and+form+guide",
            text: "Front Squat Grip & Form Guide",
          },
        ],
      },
      {
        name: "Wall Sit",
        description: "Lean against wall with thighs parallel to the floor and hold the position.",
        difficulty: "beginner",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=wall+sit+exercise+form",
            text: "Wall Sit Exercise Guide",
          },
        ],
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
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=toe+raises+for+shins",
            text: "Toe Raises for Shin Splints",
          },
        ],
      },
      {
        name: "Tibialis Raises",
        description: "Lean back against wall, raise toes off ground repeatedly.",
        difficulty: "beginner",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=knees+over+toes+guy+tibialis+raise",
            text: "Tibialis Raises (KOT Guide)",
          },
        ],
      },
      {
        name: "Banded Dorsiflexion",
        description: "Sit with band around foot, flex toes toward shin against band resistance.",
        difficulty: "beginner",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=banded+dorsiflexion+tutorial",
            text: "Banded Dorsiflexion Tutorial",
          },
        ],
      },
      {
        name: "Heel Walks",
        description: "Walk on your heels with toes off the ground for distance.",
        difficulty: "beginner",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=heel+walks+exercise+benefits",
            text: "Heel Walks Exercise Benefits",
          },
        ],
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
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=barbell+shrugs+guide",
            text: "Barbell Shrugs Guide",
          },
        ],
      },
      {
        name: "Face Pulls",
        description: "Pull cable rope toward face with elbows high.",
        difficulty: "intermediate",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=face+pulls+athlean+x",
            text: "How to Do Face Pulls Correctly",
          },
        ],
      },
      {
        name: "Upright Rows",
        description: "Pull barbell up along body to chin level, elbows leading.",
        difficulty: "intermediate",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=how+to+do+upright+rows+safely",
            text: "Upright Rows: Safety & Form",
          },
        ],
      },
      {
        name: "Dumbbell Shrugs",
        description: "Hold dumbbells at sides, shrug shoulders up and squeeze at top.",
        difficulty: "beginner",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=dumbbell+shrugs+form",
            text: "Dumbbell Shrugs Form",
          },
        ],
      },
      {
        name: "Rack Pulls",
        description: "Deadlift from elevated pins just below the knee to emphasize upper back.",
        difficulty: "advanced",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=rack+pulls+form+and+benefits",
            text: "Rack Pulls Form and Benefits",
          },
        ],
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
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=how+to+do+more+pull+ups+guide",
            text: "Pull-Ups Masterclass",
          },
        ],
      },
      {
        name: "Lat Pulldown",
        description: "Sit at cable machine, pull bar down to upper chest.",
        difficulty: "beginner",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=lat+pulldown+form+mistakes",
            text: "Lat Pulldown Form & Mistakes",
          },
        ],
      },
      {
        name: "Bent-Over Rows",
        description: "Hinge at hips, pull barbell to lower chest.",
        difficulty: "intermediate",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=bent+over+barbell+row+tutorial",
            text: "Bent-Over Barbell Row Tutorial",
          },
        ],
      },
      {
        name: "Single-Arm Dumbbell Row",
        description: "Brace one hand on bench, row dumbbell to hip with the other arm.",
        difficulty: "beginner",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=single+arm+dumbbell+row+guide",
            text: "Single-Arm Dumbbell Row Guide",
          },
        ],
      },
      {
        name: "T-Bar Row",
        description: "Straddle a landmine bar, row the weighted end toward your chest.",
        difficulty: "intermediate",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=t+bar+row+form+tutorial",
            text: "T-Bar Row Form Tutorial",
          },
        ],
      },
      {
        name: "Straight-Arm Pulldown",
        description: "Stand at cable machine, pull bar down to thighs with arms straight.",
        difficulty: "intermediate",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=straight+arm+lat+pulldown",
            text: "Straight-Arm Lat Pulldown Guide",
          },
        ],
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
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=seated+cable+row+form+guide",
            text: "Seated Cable Row Form Guide",
          },
        ],
      },
      {
        name: "Reverse Flyes",
        description: "Bend forward, raise dumbbells to sides squeezing upper back.",
        difficulty: "intermediate",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=reverse+dumbbell+flyes+tutorial",
            text: "Reverse Dumbbell Flyes Guide",
          },
        ],
      },
      {
        name: "Band Pull-Aparts",
        description:
          "Hold resistance band at shoulder width, pull apart until arms are extended to sides.",
        difficulty: "beginner",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=band+pull+aparts+guide",
            text: "Band Pull-Aparts Guide",
          },
        ],
      },
      {
        name: "Prone Y Raise",
        description: "Lie face down, raise arms in a Y shape overhead squeezing shoulder blades.",
        difficulty: "beginner",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=prone+y+raise+exercise",
            text: "Prone Y Raise Execution",
          },
        ],
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
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=tricep+dips+exercise+form",
            text: "Tricep Dips Form Guide",
          },
        ],
      },
      {
        name: "Skull Crushers",
        description: "Lie on bench, lower barbell to forehead by bending elbows, extend.",
        difficulty: "intermediate",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=how+to+do+skull+crushers+safely",
            text: "Skull Crushers: Execution & Safety",
          },
        ],
      },
      {
        name: "Tricep Pushdown",
        description: "Push cable attachment down by extending elbows.",
        difficulty: "beginner",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=rope+tricep+pushdown+tutorial",
            text: "Rope Tricep Pushdown Tutorial",
          },
        ],
      },
      {
        name: "Overhead Tricep Extension",
        description: "Hold dumbbell overhead with both hands, lower behind head, extend back up.",
        difficulty: "beginner",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=overhead+dumbbell+tricep+extension",
            text: "Overhead Tricep Extension Guide",
          },
        ],
      },
      {
        name: "Close-Grip Bench Press",
        description: "Bench press with hands shoulder-width apart to emphasize triceps.",
        difficulty: "intermediate",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=close+grip+bench+press+triceps",
            text: "Close-Grip Bench Press Tutorial",
          },
        ],
      },
      {
        name: "Diamond Push-Ups",
        description: "Push-ups with hands close together forming a diamond shape under chest.",
        difficulty: "intermediate",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=how+to+do+diamond+push+ups",
            text: "Diamond Push-Ups Tutorial",
          },
        ],
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
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=how+to+do+hip+thrusts+properly",
            text: "How to Do Hip Thrusts Properly",
          },
        ],
      },
      {
        name: "Deadlifts",
        description: "Lift barbell from floor by extending hips and knees.",
        difficulty: "advanced",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/watch?v=ZaTM37cfiDs",
            text: "How To Deadlift With Perfect Technique",
          },
        ],
      },
      {
        name: "Bulgarian Split Squats",
        description: "Rear foot elevated, lower front knee to 90 degrees.",
        difficulty: "intermediate",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=bulgarian+split+squat+form+guide",
            text: "Bulgarian Split Squat Form Guide",
          },
        ],
      },
      {
        name: "Glute Bridges",
        description: "Lie on back with knees bent, drive hips up squeezing glutes at the top.",
        difficulty: "beginner",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=glute+bridge+form+vs+hip+thrust",
            text: "Glute Bridge Setup & Form",
          },
        ],
      },
      {
        name: "Cable Kickbacks",
        description: "Attach ankle cuff to low cable, kick leg straight back squeezing glute.",
        difficulty: "beginner",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=cable+kickbacks+glutes+form",
            text: "Cable Kickbacks Form",
          },
        ],
      },
      {
        name: "Step-Ups",
        description: "Step onto a box or bench with one leg, drive through heel to stand up.",
        difficulty: "beginner",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=proper+box+step+ups+exercise",
            text: "Proper Box Step-Ups Guide",
          },
        ],
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
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=romanian+deadlift+form+tutorial",
            text: "Romanian Deadlift Form Tutorial",
          },
        ],
      },
      {
        name: "Leg Curls",
        description: "Lie face down on machine, curl heels toward glutes.",
        difficulty: "beginner",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=lying+leg+curl+machine+tips",
            text: "Lying Leg Curl Setup and Tips",
          },
        ],
      },
      {
        name: "Good Mornings",
        description: "Barbell on shoulders, hinge at hips keeping back straight.",
        difficulty: "advanced",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=good+mornings+exercise+form",
            text: "Good Mornings Exercise Form",
          },
        ],
      },
      {
        name: "Nordic Hamstring Curl",
        description: "Kneel with feet anchored, slowly lower body forward, then curl back up.",
        difficulty: "advanced",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=nordic+hamstring+curl+tutorial",
            text: "Nordic Hamstring Curl Progression",
          },
        ],
      },
      {
        name: "Kettlebell Swing",
        description:
          "Hinge at hips, swing kettlebell between legs and up to chest height with hip drive.",
        difficulty: "intermediate",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=perfect+kettlebell+swing+tutorial",
            text: "Perfect Kettlebell Swing Tutorial",
          },
        ],
      },
      {
        name: "Sumo Deadlift",
        description: "Wide stance deadlift with hands inside the knees, drive through hips.",
        difficulty: "intermediate",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=sumo+deadlift+technique+guide",
            text: "Sumo Deadlift Technique Guide",
          },
        ],
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
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=proper+standing+calf+raises",
            text: "Standing Calf Raises Guide",
          },
        ],
      },
      {
        name: "Seated Calf Raises",
        description: "Sit with weight on knees, raise heels off ground.",
        difficulty: "beginner",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=seated+calf+raise+form",
            text: "Seated Calf Raise Form",
          },
        ],
      },
      {
        name: "Jump Rope",
        description: "Skip rope staying on balls of feet for calf endurance.",
        difficulty: "intermediate",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=jump+rope+basics+tutorial",
            text: "Jump Rope Basics Tutorial",
          },
        ],
      },
      {
        name: "Donkey Calf Raises",
        description: "Bend at hips with weight on back, raise heels off a platform.",
        difficulty: "intermediate",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=donkey+calf+raises+guide",
            text: "Donkey Calf Raises Execution",
          },
        ],
      },
      {
        name: "Single-Leg Calf Raise",
        description: "Stand on one foot on a step edge, raise and lower heel for isolation.",
        difficulty: "intermediate",
        resources: [
          {
            type: "video",
            link: "https://www.youtube.com/results?search_query=single+leg+calf+raise+guide",
            text: "Single-Leg Calf Raise Isolation",
          },
        ],
      },
    ],
  },
];
export function getExercisesForMuscle(id: string): Exercise[] | undefined {
  return muscles.find((m) => m.id === id)?.exercises;
}
