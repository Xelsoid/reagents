import { IReagent, reagents } from "../data/reagents";

export const getReagent = (uuid: string): IReagent | null => {
  return reagents.find((reagent) => uuid === reagent.uuid) || null;
};

export const getAllReagents = (): IReagent[] => reagents;

export const addReagent = (reagent: IReagent): IReagent => reagent;

export const updateReagent = (uuid: string, amount: number) => {
  const reagent = getReagent(uuid);
  if (!reagent || !amount) {
    return null;
  }
  return { ...reagent, amount };
};

export const deleteReagent = (uuid: string) => {
  const reagent = getReagent(uuid);
  // delete reagent
  return !!reagent;
};
