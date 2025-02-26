import { NextFunction, Request, Response } from "express";
import jwt  from "jsonwebtoken";


export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1]; 
  
    // if (token == null) return res.sendStatus(401); 

    // jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    //     if (err) return res.sendStatus(403); 
    //     // console.log(user)
    //     // Ensure user is defined and contains gmail
    //     if (!user || !user.email) {
    //         return res.sendStatus(403); // Forbidden if user or gmail is not found
    //     }
  
    //     const foundUser = await findFarmerByGmail(user.email); 
  
    //     if (!foundUser) {
    //         return res.sendStatus(404); // Not Found if user is not found
    //     }
  
    //     req.user = foundUser; // Attach the found user to the request object
    //     next();
    // });
};