import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { config } from "dotenv";

config();

const { GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, SPREADSHEET_ID } =
  process.env;

const serviceAccountAuth = new JWT({
  email: GOOGLE_SERVICE_ACCOUNT_EMAIL!,
  key: GOOGLE_PRIVATE_KEY!,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const spreadsheetDocument = new GoogleSpreadsheet(
  SPREADSHEET_ID!,
  serviceAccountAuth,
);

export { spreadsheetDocument };
