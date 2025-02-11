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

    return res.status(200).send(reagents);
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
      await addNewEntryToLogs(reagent, user, "Receipt");

      return res.status(200).send(reagent);
    }
  } catch (e) {
    return next(e);
  }
};

// not in use
export const updateReagent = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user, body } = req;
    const reagent = await updateReagentData(body);

    if (reagent && user) {
      await addNewEntryToLogs(reagent, user);

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
      await addNewEntryToLogs(reagent, user);

      return res.status(200).send(reagent);
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
  const { uuid } = req.body;
  try {
    const wasReagentDeleted = await deleteReagentData(uuid);

    if (wasReagentDeleted) {
      return res.status(200).send({ uuid });
    }
    return res.status(404).send({
      message: "The reagent was not found",
    });
  } catch (e) {
    return next(e);
  }
};
