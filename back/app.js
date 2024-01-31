const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const getController = require("./getController");
const editarController = require("./controller/Productos/editar");
const añadirController = require("./controller/Productos/añadir");
const deleteController = require("./controller/Productos/delete");

const movimientoController = require("./controller/Movimientos/movimiento");
const verMovimientosController = require("./controller/Movimientos/verMovimientos");

const cliente = require("./controller/Clientes/getCliente");
const editarCliente = require("./controller/Clientes/edit");
const eliminarCliente = require("./controller/Clientes/delete");

const app = express();
app.use(cors());

app.get("/", getController);

app.delete("/eliminar/:id", deleteController);

app.use(express.json());

app.post("/anadir", añadirController);

app.put("/editar", editarController);

app.put("/venta", movimientoController);

app.post("/movimiento", movimientoController);

app.get("/vermovimientos", verMovimientosController);

app.get("/cliente", cliente);

app.put("/editarCliente", editarCliente);

app.delete("/eliminarCliente/:id", eliminarCliente);

app.listen(process.env.port, () => {
  console.log(
    `Servidor Express en funcionamiento en el puerto ${process.env.port}`
  );
});
