import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { logger } from "./api/utils";
import { REAGENTS_ENDPOINTS } from "./api/constants";
import {
  addReagent,
  deleteReagent,
  getReagents,
  updateReagentAmount,
} from "./api/controllers/reagents.controller";

dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);

app.get(REAGENTS_ENDPOINTS.GET_REAGENTS, getReagents);

app.post(REAGENTS_ENDPOINTS.ADD_REAGENT, addReagent);

app.patch(REAGENTS_ENDPOINTS.UPDATE_REAGENT_AMOUNT, updateReagentAmount);

app.delete(REAGENTS_ENDPOINTS.DELETE_REAGENT, deleteReagent);

app.all("*", (req, res) => {
  res.status(200).send({
    API: "Welcome to Reagent API",
  });
});

export { app };
