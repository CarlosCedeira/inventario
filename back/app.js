const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const getProduct = require("./controller/Products/getProduct");
const postProduct = require("./controller/Products/postProduct");
const putProduct = require("./controller/Products/putProduct");
const deleteProduct = require("./controller/Products/deleteProduct");

const getMovement = require("./controller/Movements/getMovements");
const postMovement = require("./controller/Movements/postMovement");

const getClient = require("./controller/Clients/getCliente");
const postClient = require("./controller/Clients/postCliente");
const putClient = require("./controller/Clients/putClient");
const deleteClient = require("./controller/Clients/deleteClient");

const getSelfs = require("./controller/Selfs/getSelfs");
const postSelf = require("./controller/Selfs/postSelf");
const deleteSale = require("./controller/Selfs/deleteSelf");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/products", getProduct);
app.delete("/deleteProduct/:id", deleteProduct);
app.post("/addProduct", postProduct);
app.put("/editProduct", putProduct);

app.get("/movements", getMovement);
app.post("/addMovement", postMovement);

app.get("/clients", getClient);
app.post("/addClient", postClient);
app.put("/editClient", putClient);
app.delete("/deleteClient/:id", deleteClient);

app.get("/selfs", getSelfs);
app.post("/addSelf", postSelf);
app.delete("/deleteSale/:id", deleteSale);

app.listen(process.env.port, () => {
  console.log(`Server working in port ${process.env.port}`);
});
