import express from "express";
import bodyParser from "body-parser";
import {logger
} from "./utils";
import {REAGENTS_ENDPOINTS} from "./constants";
import {getReagents} from "./controllers/reagents.controller";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);

app.get(REAGENTS_ENDPOINTS.GET_REAGENTS, getReagents);

app.listen(3000, () => {
  /* eslint-disable no-console */
  console.log("Server is started");
});
