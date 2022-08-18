import express from "express";
const bodyParser = require("body-parser");
import bearerToken from "express-bearer-token";
import errorMiddleware from "./src/middlewares/error.middleware"

const app = express();
const port = 8080;

const cors = require("cors");
if (process.env.NODE_ENV === "production") {
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
} else {
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
}

app.use(bearerToken());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

import db from "./src/db";
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.get("/", async (req, res) => {
  res.send("Hello there");
});
require("./src/routes/index.routes.ts")(app);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Tasks server listening at http://localhost:${port}`);
});
