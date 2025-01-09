import { Logger } from "./logger";
import { spreadsheetDocument } from "./googleSpreadsheetAuth";

const spreadSheets = new Logger(spreadsheetDocument);

export const { addEntryToLogs } = spreadSheets;
