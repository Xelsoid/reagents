export const REAGENTS_ENDPOINTS = {
  GET_REAGENTS: "/api/getReagents",
  ADD_REAGENT: "/api/addReagent",
  UPDATE_REAGENT_AMOUNT: "/api/updateReagentAmount",
  UPDATE_REAGENT: "/api/updateReagent",
  DELETE_REAGENT: "/api/deleteReagent",
};

export const AUTHENTICATION = {
  LOGIN: "/api/login",
  CREATE_USER: "/api/create-account",
  DELETE_USER: "/api/deleteUser",
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
