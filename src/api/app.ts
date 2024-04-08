import express from "express";
import bodyParser from "body-parser";
import {logger
} from "./utils";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);

app.listen(3000, () => {
  console.log("Server is started");
});
