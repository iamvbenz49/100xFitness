import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function insertWorkouts(userId: string) {
  async function pushSampleWorkouts() {
    const strengthWorkouts = [
      "Bench Press", "Deadlift", "Squat", "Overhead Press", "Barbell Row",
      "Pull-ups", "Dips", "Bicep Curls", "Tricep Extensions", "Lunges",
      "Leg Press", "Calf Raises", "Shoulder Shrugs", "Lat Pulldown", "Cable Rows",
      "Incline Bench Press", "Decline Bench Press", "Hammer Curls", "Front Squats", "Hack Squats",
      "Romanian Deadlifts", "Good Mornings", "Chest Flys", "Face Pulls", "Seated Shoulder Press",
      "Arnold Press", "Close-Grip Bench Press", "Zottman Curls", "Reverse Lunges", "Hip Thrusts",
      "Snatch Grip Deadlifts", "Sumo Deadlifts", "Goblet Squats", "Step-Ups", "Seated Calf Raises",
      "Farmer’s Walk", "Trap Bar Deadlifts", "T-Bar Rows", "Reverse Flys", "Side Lateral Raises",
      "Turkish Get-Ups", "Cable Kickbacks", "Kettlebell Swings", "Hanging Leg Raises", "Plank Rows",
      "Russian Twists", "Landmine Press", "Sled Push", "Battle Ropes", "Chest Press Machine",
      "Leg Curl Machine", "Glute Bridges", "Mountain Climbers", "Burpees", "Dumbbell Snatch",
      "Medicine Ball Slams", "Jump Squats", "Box Jumps", "Seated Leg Press", "Pistol Squats",
      "Wall Sits", "Hex Bar Deadlifts", "Farmer’s Carry", "Sandbag Deadlifts", "Kettlebell Goblet Squat",
      "Kettlebell Deadlifts", "Bosu Ball Squats", "Weighted Step-Ups", "Bulgarian Split Squats",
      "Lateral Band Walks", "Resistance Band Rows", "Standing Calf Raises", "Hollow Body Hold",
      "Superman Hold", "Lying Leg Curls", "Dumbbell Thrusters", "Box Step Overs", "Weighted Chin-Ups",
      "Single-Arm Dumbbell Press", "Dumbbell Floor Press", "Chest Dips", "Skull Crushers",
      "EZ Bar Curls", "Reverse Grip Lat Pulldown", "Smith Machine Squats", "Pendlay Rows",
      "Seal Rows", "Deficit Deadlifts", "Trap Bar Shrugs", "Dumbbell Side Bends", "Dumbbell Windmills",
      "TRX Rows", "TRX Push-Ups", "TRX Pistol Squats", "Suspended Ab Crunches", "Battle Rope Slams",
      "Wall Ball Shots", "Overhead Squats", "Dead Hang", "Hanging Knee Raises", "Hanging Windshield Wipers",
      "Cable Woodchoppers", "Ab Rollouts", "Dumbbell Renegade Rows", "Rope Climbs", "Sledgehammer Slams",
      "Barbell Hip Thrusts", "Dumbbell Deadlifts", "Single-Leg Romanian Deadlifts", "Kettlebell Turkish Get-Up",
      "Weighted Russian Twists", "Handstand Push-Ups", "Incline Dumbbell Curls", "Face Pulls with Rope",
      "Glute Ham Raises", "Reverse Hypers", "Front Lever Progression", "Muscle-Ups", "L-Sit Holds",
      "Ring Rows", "Ring Dips", "Planche Push-Ups", "Side Plank Dips", "Sissy Squats", "Sled Drags",
      "Yoke Walks", "Atlas Stone Lifts", "Zercher Squats", "Duck Walks", "Front Rack Lunges",
      "Offset Farmer’s Carry", "Tire Flips", "Heavy Bag Carries", "Single-Arm Farmers Walk",
      "Sandbag Shouldering", "Barbell Overhead Carry", "Sledgehammer Training", "GHD Sit-Ups",
      "Band-Resisted Sprints", "Depth Jumps", "Dumbbell Step-Ups with Knee Drive", "Sled Pulls",
      "Battle Rope Alternating Waves", "Dumbbell Box Squats", "Jump Lunges", "Kettlebell Clean & Press",
      "Sled Rope Pulls", "Axle Deadlifts", "Reverse Grip Bench Press", "Trap Bar Jump Shrugs",
      "Bamboo Bar Bench Press", "Lumberjack Squats", "Heavy Resistance Band Squats", "Zercher Carry",
      "Heavy Kettlebell Swings", "Deficit Push-Ups", "Incline Treadmill Sprints", "Tire Pushes",
      "Bear Crawls", "Farmer’s Walk with Fat Gripz", "Sled Sprints", "Landmine Reverse Lunges",
      "Single-Leg Step Downs", "Elevated Split Squats", "Jefferson Deadlifts", "Deadlift Holds",
      "Weighted Pull-Ups", "Side-to-Side Landmine Press", "Kettlebell Around the World",
      "Heavy Dumbbell Holds", "Suitcase Carries", "Zottman Preacher Curls", "Weighted Planks",
      "Battle Rope Jump Slams", "Incline Push-Ups", "Isometric Squats", "Hollow Rocks",
      "Weighted Side Planks", "Boxing Heavy Bag Punches", "Kettlebell Windmills",
      "Barbell Rollouts", "Dumbbell Power Cleans", "Kettlebell Front Rack Squats",
      "Dumbbell Deficit Reverse Lunges", "Jump Rope Double Unders", "Staggered Stance Deadlifts",
      "Kettlebell Overhead Squats"
    ];

    const sampleWorkouts = strengthWorkouts.map((name) => ({ userId, name }));

    try {
      await prisma.workoutExercise.createMany({
        data: sampleWorkouts,
        skipDuplicates: true, 
      });
      console.log("200 strength training workouts inserted successfully");
    } catch (error) {
      console.error("Error inserting sample workouts:", error);
    } finally {
      await prisma.$disconnect();
    }
  }

  await pushSampleWorkouts();
}
