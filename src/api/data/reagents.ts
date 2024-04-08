export interface IReagent {
  uuid: string;
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

export const reagents: IReagent[] = [
  {
    uuid: "c1d87988-48d6-41ba-abe0-a6c79c56312d",
    id: "1/01/23",
    name: "Метанол",
    amount: 500,
    minAmount: 0,
    unit: "мл",
    supplier: "БелФарм",
    producer: "Беларусь",
    storageConditions: "Холодильник",
    storagePlace: "1/1",
  },
];
