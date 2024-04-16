import { Response, Request, NextFunction } from "express";
import {
  addReagentData,
  deleteReagentData,
  getReagentsData,
  updateReagentData,
  updateReagentQuantity,
} from "../servises/reagents.service";

export const getReagents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reagents = await getReagentsData();

    return res.status(200).send({
      data: { reagents },
    });
  } catch (e) {
    return next(e);
  }
};

export const addReagent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reagent = await addReagentData(req.body);

    return res.status(200).send({
      data: { reagent },
    });
  } catch (e) {
    return next(e);
  }
};

export const updateReagent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reagent = await updateReagentData(req.body);

    if (reagent) {
      return res.status(200).send({
        data: { reagent },
      });
    }

    return res.status(404).send({
      message: "The reagent was not found",
    });
  } catch (e) {
    return next(e);
  }
};

export const updateReagentAmount = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reagent = await updateReagentQuantity(req.body);

    if (reagent) {
      return res.status(200).send({
        data: { reagent },
      });
    }

    return res.status(404).send({
      message: "The reagent was not found",
    });
  } catch (e) {
    return next(e);
  }
};

export const deleteReagent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const wasReagentDeleted = await deleteReagentData(req.body);

    if (wasReagentDeleted) {
      return res.status(200).send({
        message: "The reagent was deleted",
      });
    }
    return res.status(404).send({
      message: "The reagent was not found",
    });
  } catch (e) {
    return next(e);
  }
};
