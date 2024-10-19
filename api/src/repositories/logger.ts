import { config } from "dotenv";
import { IReagent } from "../interface/reagents";
import { Reagents } from "./reagents";

const {
  GoogleSpreadsheet,
  GoogleSpreadsheetRow,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require("google-spreadsheet");

config();

const SHEET_INDEX = 2;
const COLORS = {
  NEUTRAL: { red: 0, green: 0, blue: 0 },
  RECEIPT: { red: 0.5, green: 1, blue: 0.5 },
  WRITE_OFF: { red: 1, green: 0.5, blue: 0.5 },
};

export class Logger {
  private doc: typeof GoogleSpreadsheet;

  constructor(sheetDocument: typeof GoogleSpreadsheet) {
    this.doc = sheetDocument;
    this.addEntryToLogs = this.addEntryToLogs.bind(this);
  }

  async initialize() {
    await this.doc.loadInfo();
  }

  private async getSheet(index = SHEET_INDEX) {
    await this.initialize();
    return this.doc.sheetsByIndex[index];
  }

  async addEntryToLogs(
    reagent: Required<Omit<IReagent, "minAmount" | "prevAmount">>,
    user_id: string,
    operationType: string,
  ) {
    try {
      const isReceipt = operationType === "Receipt";
      const isWriteOff = operationType === "Write-off";
      const rowColor = isReceipt
        ? COLORS.RECEIPT
        : isWriteOff
          ? COLORS.WRITE_OFF
          : COLORS.NEUTRAL;

      const sheet = await this.getSheet();
      const newRow = await sheet.addRow({
        ...reagent,
        user: user_id,
        operationType,
      });
      const rowIndex = newRow.rowNumber - 1;
      const [, cellsRange] = newRow.a1Range.split("!");
      await sheet.loadCells(cellsRange);
      const cellsAmount = sheet.cellStats.loaded;

      for (let i = 0; i < cellsAmount; i++) {
        try {
          const cell = sheet.getCell(rowIndex, i);
          cell.backgroundColor = rowColor;
        } catch (e) {
          break;
        }
      }
      await sheet.saveUpdatedCells();
      sheet.resetLocalCache();
    } catch (e) {
      console.error(e);
    }
  }
}
