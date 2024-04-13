import { JWT } from "google-auth-library";
import { GoogleSheet } from "../../googleSheets";
import json from "../../../reagents-419912-2ae01760f621.json";

const {
  GoogleSpreadsheet,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require("google-spreadsheet");

const serviceAccountAuth = new JWT({
  email: json.client_email,
  key: json.private_key,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const document = new GoogleSpreadsheet(
  "1AeyWjy53du1-9wsctJEB82Bz5LbruT9p3ilEhOzpIcY",
  serviceAccountAuth,
);

const spreadSheets = new GoogleSheet(document);

export const { getAllReagents, addReagent, deleteReagent, updateReagent } =
  spreadSheets;
