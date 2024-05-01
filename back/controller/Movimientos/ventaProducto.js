const express = require("express");
const router = express.Router();
const dbConfig = require("../../config");
const mysql = require("mysql2/promise");

router.put("/venta", async (req, res) => {
  let rows;
  const connection = await mysql.createConnection(dbConfig);
  try {
    const { clientes, accion, cantidad, id } = req.body;
    console.log(req.body);

    //Ruta para las ventas, guarda el numero de produtos vendidos
    if (cantidad) {
      const [rows] = await connection.execute(
        "INSERT INTO movimiento (accion, nombre, precio, cantidad, caducidad, id_foraneo) " +
          "SELECT ?, nombre_producto, precio, ?, caducidad, ? FROM almacen.producto WHERE id = ?",
        [accion, cantidad, id, id]
      );
    } else {
      const [rows] = await connection.execute(
        "INSERT INTO movimiento (accion, nombre, precio, cantidad, caducidad, id_foraneo) " +
          "SELECT ?, nombre_producto, precio, cantidad, caducidad, ? FROM almacen.producto WHERE id = ?",
        [accion, id, id]
      );
    }

    res.json(rows);
  } catch (err) {
    console.error("Error al consultar la base de datooos: " + err.message);
    res.status(500).json({ error: "Error al obtener datos de la tabla" });
  } finally {
    if (connection && connection.end) {
      connection.end();
    }
  }
});

module.exports = router;
