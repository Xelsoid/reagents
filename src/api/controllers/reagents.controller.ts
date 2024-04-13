import { Response, Request, NextFunction } from "express";
import {
  addReagentData,
  deleteReagentData,
  getReagentsData,
  updateReagentData,
} from "../servises/reagents.service";

export const getReagents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reagents = await getReagentsData();

    res.status(200).send({
      data: { reagents },
    });
  } catch (e) {
    next(e);
  }
};

export const addReagent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reagent = await addReagentData(req.body);

    res.status(200).send({
      data: { reagent },
    });
  } catch (e) {
    next(e);
  }
};

export const updateReagentAmount = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reagent = await updateReagentData(req.body);

    if (reagent) {
      res.status(200).send({
        data: { reagent },
      });
      return;
    }

    res.status(404).send({
      error: "Reagent data was not found",
    });
  } catch (e) {
    next(e);
  }
};

export const deleteReagent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const wasReagentDeleted = await deleteReagentData(req.body);

    res.status(wasReagentDeleted ? 200 : 404).send({
      success: wasReagentDeleted,
    });
  } catch (e) {
    next(e);
  }
};
