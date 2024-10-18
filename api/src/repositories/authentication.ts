import dotenv from "dotenv";

const {
  GoogleSpreadsheet,
  GoogleSpreadsheetRow,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require("google-spreadsheet");

const SHEET_INDEX = 1;
dotenv.config();

export class Authentication {
  private doc: typeof GoogleSpreadsheet;

  constructor(sheetDocument: typeof GoogleSpreadsheet) {
    this.doc = sheetDocument;
    this.getAllUsers = this.getAllUsers.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.createUser = this.createUser.bind(this);
    this.deleteExistingUser = this.deleteExistingUser.bind(this);
  }

  private async getSheet(index = SHEET_INDEX) {
    await this.doc.loadInfo();
    return this.doc.sheetsByIndex[index];
  }

  private static findRow(rows: [typeof GoogleSpreadsheetRow], name: string) {
    return rows.find((row) => row.get("name") === name);
  }

  async getAllUsers() {
    const sheet = await this.getSheet();
    const rows = await sheet.getRows();
    return rows.map((row: typeof GoogleSpreadsheetRow) => row.toObject());
  }

  async getCurrentUser(userName: string) {
    const users = await this.getAllUsers();
    return users?.find((user: { name: string }) => user.name === userName);
  }

  async createUser(
    name: string,
    email: string,
    password: string,
    role: string,
  ) {
    const sheet = await this.getSheet();
    const newRow = await sheet.addRow({
      name,
      email,
      password,
      role,
      isActive: true,
    });
    return newRow.toObject();
  }

  async deleteExistingUser(name: string) {
    const sheet = await this.getSheet();
    const rows = await sheet.getRows();
    const row = Authentication.findRow(rows, name);
    if (row) {
      await row.delete();
      // eslint-disable-next-line no-underscore-dangle
      return row._deleted;
    }
    return null;
  }
}
