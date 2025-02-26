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
      },
    });

    return newUser; 
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Could not create user");
  }
};
