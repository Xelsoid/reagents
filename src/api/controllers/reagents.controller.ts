import { Response, Request, NextFunction } from "express";
import {
  addReagentData,
  deleteReagentData,
  getReagentsData,
  updateReagentData,
} from "../servises/ragents.service";

export const getReagents = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const reagents = await getReagentsData();

  res.status(200).send({
    data: { reagents },
    error: null,
  });
};

export const addReagent = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const reagent = await addReagentData(req.body);

  res.status(200).send({
    data: { reagent },
    error: null,
  });
};

export const updateReagentAmount = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const reagent = await updateReagentData(req.body);

  res.status(200).send({
    data: { reagent },
    error: null,
  });
};

export const deleteReagent = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const isReagentDeleted = await deleteReagentData(req.body);

  res.status(200).send({
    success: isReagentDeleted,
    error: null,
  });
};
