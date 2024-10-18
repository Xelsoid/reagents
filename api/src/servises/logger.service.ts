import { randomUUID } from "crypto";
import { addEntryToLogs } from "../repositories/logger.repository";
import { IReagent } from "../interface/reagents";

export const addNewEntryToLogs = (requestBody: Required<IReagent>) => {
  const {
    id,
    name,
    amount,
    prevAmount,
    unit,
    supplier,
    producer,
    storageConditions,
    storagePlace,
  } = requestBody;

  const amountDif = prevAmount - amount;

  const reagent = {
    uuid: randomUUID(),
    id,
    name,
    amount,
    unit,
    supplier,
    producer,
    storageConditions,
    storagePlace,
    amountDif,
  };

  return addEntryToLogs(reagent);
};
