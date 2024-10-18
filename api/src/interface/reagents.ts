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
  prevAmount?: number;
  amountDif?: number;
}
