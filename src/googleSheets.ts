import dotenv from "dotenv";
import { IReagent } from "./api/data/reagents";

dotenv.config();

const {
  GoogleSpreadsheet,
  GoogleSpreadsheetRow,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require("google-spreadsheet");

const SHEET_INDEX = 0;

export class GoogleSheet {
  private doc: typeof GoogleSpreadsheet;

  constructor(sheetDocument: typeof GoogleSpreadsheet) {
    this.doc = sheetDocument;
    this.getAllReagents = this.getAllReagents.bind(this);
    this.addReagent = this.addReagent.bind(this);
    this.deleteReagent = this.deleteReagent.bind(this);
    this.updateReagent = this.updateReagent.bind(this);
    this.updateReagentAmount = this.updateReagentAmount.bind(this);
  }

  async initialize() {
    await this.doc.loadInfo();
  }

  private async getSheet(index = SHEET_INDEX) {
    await this.doc.loadInfo();
    return this.doc.sheetsByIndex[index];
  }

  private findRow(rows: [typeof GoogleSpreadsheetRow], uuid: string) {
    return rows.find((row) => row.get("uuid") === uuid);
  }

  async getAllReagents() {
    const sheet = await this.getSheet();
    const rows = await sheet.getRows();
    return rows.map((row: typeof GoogleSpreadsheetRow) => row.toObject());
  }

  async updateReagent(uuid: string, reagent: IReagent) {
    const sheet = await this.getSheet();
    const rows = await sheet.getRows();
    const row = this.findRow(rows, uuid);
    if (row) {
      row.assign(reagent);
      await row.save();
      return row.toObject();
    }
    return null;
  }

  async addReagent(reagent: IReagent) {
    const sheet = await this.getSheet();
    const newRow = await sheet.addRow(reagent);
    return newRow.toObject();
  }

  async deleteReagent(uuid: string) {
    const sheet = await this.getSheet();
    const rows = await sheet.getRows();
    const row = this.findRow(rows, uuid);
    if (row) {
      await row.delete();
      // eslint-disable-next-line no-underscore-dangle
      return row._deleted;
    }
    return null;
  }

  async updateReagentAmount(uuid: string, amount: number) {
    const sheet = await this.getSheet();
    const rows = await sheet.getRows();
    const row = this.findRow(rows, uuid);
    if (row) {
      row.set("amount", amount);
      await row.save();
      return row.toObject();
    }
    return null;
  }
}
