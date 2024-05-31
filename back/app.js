const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const postMovement = require("./controller/Movements/postMovement");
const postSelf = require("./controller/Selfs/postSelf");

const getController = require("./controller/getController");
const postClientProductController = require("./controller/postClientProduct");
const putController = require("./controller/putController");
const deleteController = require("./controller/deleteController");

const app = express();
app.use(cors());
app.use(express.json());
app.post("/postMovement", postMovement);
app.post("/addSelf", postSelf);

app.get("/:ruta", getController);
app.post("/:ruta", postClientProductController);
app.put("/:ruta", putController);
app.delete("/:ruta/:id", deleteController);

app.listen(process.env.port, () => {
  console.log(`Server working in port ${process.env.port}`);
});
