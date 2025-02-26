import bcrypt from "bcrypt";

const saltRounds = 10;

export const checkPassword = async (plainPassword: string, passwordHash: string): Promise<boolean> => {
  try {
    const match = await bcrypt.compare(plainPassword, passwordHash);
    
    if (match) {
      console.log("Passwords match!");
      return true;
    } else {
      console.log("Passwords do not match.");
      return false;
    }
  } catch (err) {
    console.error("Error comparing passwords:", err);
    throw err; 
  }
};
