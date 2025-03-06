import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findUserByEmail = async (email: string) => {
  try {
    if (!email) throw new Error("Email is required");

    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user || null; 
  } catch (error: any) {
    console.error("Error finding user by email:", error.message);
    return null;
  }
};

export const createNewUser = async (name: string, email: string, passwordHash: string) => {
  try {
    if (!name || !email || !passwordHash) {
      throw new Error("Missing required fields: name, email, or password");
    }


    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        isVirgin: true, 
      },
    });

    return newUser;
  } catch (error: any) {
    console.error("Error creating user:", error.message);
    throw new Error(error.message || "Could not create user");
  }
};

export const updateUserGoal = async (userId: string, goal: string, targetWeight: number, currentWeight: number) => {
  try {
    if (!userId || !goal || targetWeight == null || currentWeight == null) {
      throw new Error("Missing required fields: userId, goal, targetWeight, or currentWeight");
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { Goal: goal, targetWeight, currentWeight },
    });

    return user;
  } catch (error: any) {
    console.error("Error updating user goal:", error.message);
    throw new Error("Failed to update user goal");
  }
};
