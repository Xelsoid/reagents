import { randomUUID } from "crypto";
import {
  addReagent,
  getAllReagents,
  updateReagent,
} from "../repositories/reagents.repository";

export const getReagentsData = () => getAllReagents();

export const addReagentData = (requestBody) => {
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
  };
  return addReagent(reagent);
};

export const updateReagentData = (requestBody) => {
  const { uuid, amount } = requestBody;
  return updateReagent(uuid, amount);
};
