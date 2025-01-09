import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import json from "../../reagents-ivan.json";
import { Logger } from "./logger";
import { spreadsheetDocument } from "./googleSpreadsheetAuth";

const spreadSheets = new Logger(spreadsheetDocument);

export const { addEntryToLogs } = spreadSheets;
