import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getWeightLogs = async (userId: string) => {
  try {
    return await prisma.weightLog.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    throw new Error("Error fetching weight logs");
  }
};

export const addWeightLog = async (userId: string, weight: number) => {
  try {
    return await prisma.weightLog.create({
      data: { userId, weight },
    });
  } catch (error) {
    throw new Error("Error adding weight log");
  }
};

export const deleteWeightLog = async (logId: string, userId: string) => {
  try {
    return await prisma.weightLog.deleteMany({
      where: { id: logId, userId },
    });
  } catch (error) {
    throw new Error("Error deleting weight log");
  }
};
