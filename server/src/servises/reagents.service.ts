import { randomUUID } from "crypto";
import {
  addReagent,
  deleteReagent,
  getAllReagents,
  updateReagent,
  updateReagentAmount,
} from "../repositories/reagents.repository";
import { IReagent } from "../interface/reagents";
import { normalizeFloatNumber } from "../utils";

export const getReagentsData = async () => {
  const reagents = (await getAllReagents()) as IReagent[];

  return reagents.map((reagent: IReagent) => {
    return {
      ...reagent,
      amount: normalizeFloatNumber(reagent?.amount),
      minAmount: normalizeFloatNumber(reagent?.minAmount),
    };
  });
};

export const addReagentData = (requestBody: IReagent) => {
  const {
    id,
    name,
    amount,
    minAmount,
    unit,
    supplier,
    producer,
    storageConditions,
    storagePlace,
  } = requestBody;
  const reagent = {
    uuid: randomUUID(),
    id: id || "",
    name: name || "",
    amount: amount || 0,
    minAmount: minAmount || 0,
    unit: unit || "",
    supplier: supplier || "",
    producer: producer || "",
    storageConditions: storageConditions || "",
    storagePlace: storagePlace || "",
    isDeleted: false,
  };
  return addReagent(reagent);
};

export const updateReagentData = (requestBody: IReagent) => {
  const {
    uuid,
    id,
    name,
    amount,
    minAmount,
    unit,
    supplier,
    producer,
    storageConditions,
    storagePlace,
  } = requestBody;
  const reagent = {
    uuid,
    id,
    name,
    amount,
    minAmount,
    unit,
    supplier,
    producer,
    storageConditions,
    storagePlace,
    isDeleted: false,
  };
  return updateReagent(uuid, reagent);
};

export const updateReagentQuantity = async (requestBody: IReagent) => {
  const { uuid, amount } = requestBody;
  const reagent = await updateReagentAmount(uuid, amount);
  if (reagent) {
    return {
      ...reagent,
      amount: normalizeFloatNumber(reagent?.amount),
      minAmount: normalizeFloatNumber(reagent?.minAmount),
      prevAmount: normalizeFloatNumber(reagent?.prevAmount!),
    } as IReagent;
  }
  return reagent;
};

export const deleteReagentData = (requestBody: IReagent) => {
  const { uuid } = requestBody;
  return deleteReagent(uuid);
};
