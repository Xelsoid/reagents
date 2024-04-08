export interface IReagents {
    id: string;
    name: string;
    amount: number;
    minAmount: number;
    unit: string;
    supplier: string;
    producer: string;
    storageConditions: string;
    storagePlace: string;
}

export const Reagents: IReagents = {
  id: "1/01/23",
  name: "Метанол",
  amount: 500,
  minAmount: 0,
  unit: "мл",
  supplier: "БелФарм",
  producer: "Беларусь",
  storageConditions: "Холодильник",
  storagePlace: "1/1",
};
