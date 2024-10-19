// @ts-ignore
import serverless from "serverless-http";
import { app } from "../../api/src/app";

export const handler = serverless(app);
