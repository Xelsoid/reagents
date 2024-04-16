import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { logger } from "./api/utils";
import { AUTHENTICATION, REAGENTS_ENDPOINTS } from "./api/constants";
import {
  addReagent,
  deleteReagent,
  getReagents,
  updateReagentAmount,
} from "./api/controllers/reagents.controller";
import {
  loginUser,
  verifyToken,
  isAdmin,
  isEditor,
  isUser,
} from "./api/controllers/authentication.controller";

dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);

app.post(AUTHENTICATION.LOGIN, loginUser);

app.get(REAGENTS_ENDPOINTS.GET_REAGENTS, getReagents);

app.post(REAGENTS_ENDPOINTS.ADD_REAGENT, addReagent);

app.patch(REAGENTS_ENDPOINTS.UPDATE_REAGENT_AMOUNT, updateReagentAmount);

app.delete(REAGENTS_ENDPOINTS.DELETE_REAGENT, deleteReagent);

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).send({ message: err.message });
});

app.all("*", (req, res) => {
  res.status(200).send({
    API: "Welcome to Reagent API, please find available endpoints below",
    endpoints: [
      ...Object.keys(REAGENTS_ENDPOINTS),
      ...Object.keys(AUTHENTICATION),
    ],
  });
});

export { app };
