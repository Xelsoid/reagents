export const REAGENTS_ENDPOINTS = {
  GET_REAGENTS: "/api/reagents",
  ADD_REAGENT: "/api/reagent",
  UPDATE_REAGENT_AMOUNT: "/api/reagent/amount",
  UPDATE_REAGENT: "/api/reagent",
  DELETE_REAGENT: "/api/reagent",
};

export const AUTHENTICATION = {
  LOGIN: "/api/login",
  LOGOUT: "/api/logout",
  REGISTER: "/api/register",
  DELETE_ACCOUNT: "/api/deleteAccount",
};

export const METHOD = {
  GET: "GET",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
  POST: "POST",
};

export enum ROLES {
  ADMIN = "admin",
  EDITOR = "editor",
  USER = "user",
}
