import { JWT } from "google-auth-library";
import json from "../../reagents-ivan.json";
import { Authentication } from "./authentication";

const {
  GoogleSpreadsheet,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require("google-spreadsheet");

const serviceAccountAuth = new JWT({
  email: json.client_email,
  key: json.private_key,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const document = new GoogleSpreadsheet(json.spreadsheet_id, serviceAccountAuth);

const authentication = new Authentication(document);

export const { getCurrentUser, createUser, deleteExistingUser } =
  authentication;
