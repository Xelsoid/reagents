import { config } from "dotenv";
import { GoogleSpreadsheet, GoogleSpreadsheetRow } from "google-spreadsheet";
import { IReagent } from "../interface/reagents";

config();
const SHEET_INDEX = 0;

export class Reagents {
  private doc: GoogleSpreadsheet;

  constructor(sheetDocument: GoogleSpreadsheet) {
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
    await this.initialize();
    return this.doc.sheetsByIndex[index];
  }

  private static findRow(rows: GoogleSpreadsheetRow[], uuid: string) {
    return rows.find((row) => row.get("uuid") === uuid);
  }

  async getAllReagents() {
    const sheet = await this.getSheet();
    const rows = await sheet.getRows();
    return rows.map((row: GoogleSpreadsheetRow) => row.toObject());
  }

  async updateReagent(uuid: string, reagent: IReagent) {
    const sheet = await this.getSheet();
    const rows = await sheet.getRows();
    const row = Reagents.findRow(rows, uuid);
    if (row) {
      row.assign(reagent);
      await row.save();
      return row.toObject() as IReagent;
    }
    return null;
  }

  async addReagent(reagent: IReagent) {
    const sheet = await this.getSheet();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newRow = await sheet.addRow(reagent as Record<string, any>);
    return newRow.toObject() as IReagent;
  }

  async deleteReagent(uuid: string) {
    const sheet = await this.getSheet();
    const rows = await sheet.getRows();
    const row = Reagents.findRow(rows, uuid);
    if (row) {
      await row.delete();

      return row.deleted;
    }
    return null;
  }

  async updateReagentAmount(uuid: string, amount: number) {
    const sheet = await this.getSheet();
    const rows = await sheet.getRows();
    const row = Reagents.findRow(rows, uuid);
    const prevAmount = row?.get("amount");
    if (row) {
      row.set("amount", amount);
      await row.save();
      return { ...row.toObject(), prevAmount } as IReagent;
    }
    return null;
  }
}
