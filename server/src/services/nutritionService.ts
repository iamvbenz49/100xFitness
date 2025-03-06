import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getMacrosByUser = async (userId: string) => {
  return await prisma.nutritionLog.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const getMacrosByDate = async (userId: string, date: string) => {
  return await prisma.nutritionLog.findFirst({
    where: { userId, createdAt: new Date(date) },
  });
};

export const addMacroEntry = async (
  userId: string,
  protein: number,
  carbs: number,
  fats: number
) => {
  return await prisma.nutritionLog.create({
    data: {
      userId,
      protein,
      carbs,
      fats,
      calories: protein * 4 + carbs * 4 + fats * 9,
    },
  });
};
