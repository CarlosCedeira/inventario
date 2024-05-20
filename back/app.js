const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const getProduct = require("./controller/Products/getProduct");
const postProduct = require("./controller/Products/postProduct");
const putProduct = require("./controller/Products/putProduct");

const getMovement = require("./controller/Movements/getMovements");
const postMovement = require("./controller/Movements/postMovement");

const getClient = require("./controller/Clients/getCliente");
const postClient = require("./controller/Clients/postCliente");
const putClient = require("./controller/Clients/putClient");

const getSelfs = require("./controller/Selfs/getSelfs");
const postSelf = require("./controller/Selfs/postSelf");

const deleteController = require("./controller/prueba");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/products", getProduct);
app.post("/addProduct", postProduct);
app.put("/editProduct", putProduct);

app.get("/movements", getMovement);
app.post("/addMovement", postMovement);

app.get("/clients", getClient);
app.post("/addClient", postClient);
app.put("/editClient", putClient);

app.get("/selfs", getSelfs);
app.post("/addSelf", postSelf);

app.delete("/:ruta/:id", deleteController);

app.listen(process.env.port, () => {
  console.log(`Server working in port ${process.env.port}`);
});
