export enum ROLES {
  ADMIN = 'admin',
  EDITOR = 'editor',
  USER = 'user',
}

export enum SORTING_METHODS {
  ID_ASC = 'id-asc',
  ID_DESC = 'id-desc',
  ALPHABET_ASC = 'alphabet-asc',
  ALPHABET_DESC = 'alphabet-desc',
}

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
  isDeleted: string;
}

export const COOKIE = {
  NAME: 'name',
  ROLE: 'role',
};
