import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import json from "../../reagents-ivan.json";
import { Authentication } from "./authentication";
import { spreadsheetDocument } from "./googleSpreadsheetAuth";

const authentication = new Authentication(spreadsheetDocument);

export const { getCurrentUser, createUser, deleteExistingUser } =
  authentication;
