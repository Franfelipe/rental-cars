import express, { json } from "express";
import "./database";
import { router } from "./routes";
import swaggerUi from "swagger-ui-express";

import swaggerFile from "./swagger.json";


const app = express();

app.use(json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.listen(3333, () => {console.log("Server is running!")});

