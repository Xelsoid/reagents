import { randomUUID } from "crypto";
import {
  addReagent,
  deleteReagent,
  getAllReagents,
  updateReagent,
} from "../repositories/reagents.repository";
import { IReagent } from "../data/reagents";

export const getReagentsData = () => getAllReagents();

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
  const { uuid, amount } = requestBody;
  return updateReagent(uuid, amount);
};

export const deleteReagentData = (requestBody: IReagent) => {
  const { uuid } = requestBody;
  return deleteReagent(uuid);
};
