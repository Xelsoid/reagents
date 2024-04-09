import { Response, Request, NextFunction } from "express";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  /* eslint-disable no-console */
  console.log(`New request: ${req.method}, ${req.url}`);
  next();
};
