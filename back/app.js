const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const getProduct = require("./controller/Productos/getController");
const postProduct = require("./controller/Productos/añadir");
const putProduct = require("./controller/Productos/editar");
const deleteProduct = require("./controller/Productos/delete");

const getMovement = require("./controller/Movimientos/verMovimientos");
const postMovement = require("./controller/Movimientos/movimiento");

const getClient = require("./controller/Clientes/getCliente");
const postClient = require("./controller/Clientes/postCliente");
const putClient = require("./controller/Clientes/edit");
const deleteClient = require("./controller/Clientes/delete");

const getSelfs = require("./controller/Ventas/getSelfs");
const ventaProducto = require("./controller/Ventas/ventaProducto");

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
app.post("/addSelf", ventaProducto);

app.listen(process.env.port, () => {
  console.log(`Server working in port ${process.env.port}`);
});
