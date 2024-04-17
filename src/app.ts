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
  createUser,
  removeUser,
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

app.post(
  AUTHENTICATION.CREATE_USER,
  verifyToken as any,
  isAdmin as any,
  createUser,
);

app.delete(
  AUTHENTICATION.DELETE_USER,
  verifyToken as any,
  isAdmin as any,
  removeUser,
);

app.get(REAGENTS_ENDPOINTS.GET_REAGENTS, getReagents);

app.post(
  REAGENTS_ENDPOINTS.ADD_REAGENT,
  verifyToken as any,
  isAdmin as any,
  isEditor as any,
  addReagent,
);

app.patch(
  REAGENTS_ENDPOINTS.UPDATE_REAGENT,
  verifyToken as any,
  isAdmin as any,
  isEditor as any,
  updateReagentAmount,
);

app.patch(
  REAGENTS_ENDPOINTS.UPDATE_REAGENT_AMOUNT,
  verifyToken as any,
  isAdmin as any,
  isEditor as any,
  isUser as any,
  updateReagentAmount,
);

app.delete(
  REAGENTS_ENDPOINTS.DELETE_REAGENT,
  verifyToken as any,
  isAdmin as any,
  isEditor as any,
  deleteReagent,
);

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).send({ message: err.message });
});

app.all("*", (req, res) => {
  res.status(200).send({
    API: "Welcome to Reagent API, please find available endpoints below",
    endpoints: [
      ...Object.values(REAGENTS_ENDPOINTS),
      ...Object.values(AUTHENTICATION),
    ],
  });
});

export { app };
