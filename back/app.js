const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const postProduct = require("./controller/Products/postProduct");
const putProduct = require("./controller/Products/putProduct");

const postMovement = require("./controller/Movements/postMovement");

const postClient = require("./controller/Clients/postCliente");
const putClient = require("./controller/Clients/putClient");

const postSelf = require("./controller/Selfs/postSelf");

const deleteController = require("./controller/deleteController");
const getController = require("./controller/getController");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/postProduct", postProduct);
app.put("/editProduct", putProduct);

app.post("/postMovement", postMovement);

app.post("/postClient", postClient);
app.put("/editClient", putClient);

app.post("/addSelf", postSelf);

app.get("/:ruta", getController);
app.delete("/:ruta/:id", deleteController);

app.listen(process.env.port, () => {
  console.log(`Server working in port ${process.env.port}`);
});
