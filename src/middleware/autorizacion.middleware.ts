import { Request, Response, NextFunction } from "express";

export const autorizacion = (rol: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    let aux = req.user?.rol || "";
    if (rol.includes(aux)) {
      return next();
    } else {
      return res.status(403).json({ message: "Forbidden" });
    }
  };
};
