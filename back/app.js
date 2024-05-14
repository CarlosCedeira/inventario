const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const getController = require("./getController");
const editarController = require("./controller/Productos/editar");
const añadirController = require("./controller/Productos/añadir");
const deleteController = require("./controller/Productos/delete");

const movimientoController = require("./controller/Movimientos/movimiento");
const verMovimientosController = require("./controller/Movimientos/verMovimientos");
const ventaProducto = require("./controller/Movimientos/ventaProducto");

const cliente = require("./controller/Clientes/getCliente");
const editarCliente = require("./controller/Clientes/edit");
const eliminarCliente = require("./controller/Clientes/delete");
const anadirCliente = require("./controller/Clientes/postCliente");

const app = express();
app.use(cors());

app.get("/productos", getController);

app.delete("/eliminarProducto/:id", deleteController);

app.use(express.json());

app.post("/anadirProducto", añadirController);

app.put("/editarProducto", editarController);

app.get("/movimientos", verMovimientosController);

app.post("/añadirmovimiento", movimientoController);

app.get("/clientes", cliente);

app.post("/anadirCliente", anadirCliente);

app.put("/editarCliente", editarCliente);

app.delete("/eliminarCliente/:id", eliminarCliente);

app.post("/anadirventa", ventaProducto);

app.listen(process.env.port, () => {
  console.log(
    `Servidor Express en funcionamiento en el puerto ${process.env.port}`
  );
});
