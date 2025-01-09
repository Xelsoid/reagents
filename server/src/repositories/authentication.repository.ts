import { Authentication } from "./authentication";
import { spreadsheetDocument } from "./googleSpreadsheetAuth";

const authentication = new Authentication(spreadsheetDocument);

export const { getCurrentUser, createUser, deleteExistingUser } =
  authentication;
