import { IReagent, reagents } from "../data/reagents";

export const getAllReagents = (): IReagent[] => reagents;

export const addReagent = (reagent: IReagent): IReagent => reagent;
