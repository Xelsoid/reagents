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
