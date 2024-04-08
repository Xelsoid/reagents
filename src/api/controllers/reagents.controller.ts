import { Response, Request, NextFunction } from "express";
import { getReagentsData } from "../servises/ragents.service";

export const getReagents = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const reagents = getReagentsData();

  res.status(200).send({
    data: reagents,
    error: null,
  });
};
