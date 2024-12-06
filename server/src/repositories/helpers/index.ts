const { GoogleSpreadsheetRow } = require("google-spreadsheet");

export const findRow = (rows: [typeof GoogleSpreadsheetRow], uuid: string) => {
  return rows.find((row) => row.get("uuid") === uuid);
};
