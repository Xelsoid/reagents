import { Response, Request, NextFunction } from "express";
import {
  addReagentData,
  deleteReagentData,
  getReagentsData,
  updateReagentData,
  updateReagentQuantity,
} from "../servises/reagents.service";
import { addNewEntryToLogs } from "../servises/logger.service";
import { RequestWithUser } from "../interface/auth";

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
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user, body } = req;
    const reagent = await addReagentData(body);
    if (reagent && user) {
      addNewEntryToLogs(reagent, user, "Receipt");

      return res.status(200).send({
        data: { reagent },
      });
    }
  } catch (e) {
    return next(e);
  }
};

export const updateReagent = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user, body } = req;
    const reagent = await updateReagentData(body);

    if (reagent && user) {
      addNewEntryToLogs(reagent, user);

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
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user, body } = req;
    const reagent = await updateReagentQuantity(body);

    if (reagent && user) {
      addNewEntryToLogs(reagent, user);

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
