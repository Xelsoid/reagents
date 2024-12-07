import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { logger } from "./utils";
import { AUTHENTICATION, REAGENTS_ENDPOINTS, ROLES } from "./constants";
import {
  addReagent,
  deleteReagent,
  getReagents,
  updateReagent,
  updateReagentAmount,
} from "./controllers/reagents.controller";
import {
  loginUser,
  createUser,
  removeUser,
  verifyToken,
  hasRole,
  logoutUser,
} from "./controllers/authentication.controller";

config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);

app.post(AUTHENTICATION.LOGIN, loginUser);

app.post(AUTHENTICATION.LOGOUT, logoutUser);

app.post(
  AUTHENTICATION.CREATE_USER,
  verifyToken,
  hasRole([ROLES.ADMIN]),
  createUser,
);

app.delete(
  AUTHENTICATION.DELETE_USER,
  verifyToken,
  hasRole([ROLES.ADMIN]),
  removeUser,
);

app.get(REAGENTS_ENDPOINTS.GET_REAGENTS, getReagents);

app.post(
  REAGENTS_ENDPOINTS.ADD_REAGENT,
  verifyToken,
  hasRole([ROLES.ADMIN, ROLES.EDITOR]),
  addReagent,
);

app.patch(
  REAGENTS_ENDPOINTS.UPDATE_REAGENT,
  verifyToken,
  hasRole([ROLES.ADMIN, ROLES.EDITOR]),
  updateReagent,
);

app.patch(
  REAGENTS_ENDPOINTS.UPDATE_REAGENT_AMOUNT,
  verifyToken,
  hasRole([ROLES.ADMIN, ROLES.EDITOR]),
  updateReagentAmount,
);

app.delete(
  REAGENTS_ENDPOINTS.DELETE_REAGENT,
  verifyToken,
  hasRole([ROLES.ADMIN, ROLES.EDITOR]),
  deleteReagent,
);

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  return res.status(500).send({ message: err.message });
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
