import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import json from "../../reagents-ivan.json";
import { Reagents } from "./reagents";
import { spreadsheetDocument } from "./googleSpreadsheetAuth";

const spreadSheets = new Reagents(spreadsheetDocument);

export const {
  getAllReagents,
  addReagent,
  deleteReagent,
  updateReagent,
  updateReagentAmount,
} = spreadSheets;
