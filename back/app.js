const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const getController = require("./getController");
const editarController = require("./controller/editar");
const añadirController = require("./controller/añadir");
const deleteController = require("./controller/delete");
const movimientoController = require("./controller/movimiento");
const verMovimientosController = require("./controller/verMovimientos");

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

app.listen(process.env.port, () => {
  console.log(
    `Servidor Express en funcionamiento en el puerto ${process.env.port}`
  );
});
