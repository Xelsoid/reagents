import { JWT } from "google-auth-library";
import json from "../../reagents-ivan.json";
import { Reagents } from "./reagents";

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

const spreadSheets = new Reagents(document);

export const {
  getAllReagents,
  addReagent,
  deleteReagent,
  updateReagent,
  updateReagentAmount,
} = spreadSheets;
