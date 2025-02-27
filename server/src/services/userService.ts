import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const findUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user; 
  } catch (error) {
    console.error("Error finding user by email:", error);
    return null;
  }
};

export const createNewUser = async (name: string, email: string, passwordHash: string) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        isVirgin: true, 
      },
    });

    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Could not create user");
  }
};


export const updateUserGoal = async (userId: string, goal: string, targetWeight: number, currentWeight: number) => {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { Goal: goal, targetWeight, currentWeight: currentWeight },
    });
    return user;
  } catch (error) {
    console.error("Error updating user goal:", error);
    throw new Error("Failed to update user goal");
  }
};

