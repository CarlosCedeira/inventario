const express = require("express");
const router = express.Router();
const dbConfig = require("../../config");
const mysql = require("mysql2/promise");

router.post("/postMovement", async (req, res) => {
  console.log("req.body post movement", req.body);
  let rows;
  const connection = await mysql.createConnection(dbConfig);
  try {
    const { accion, cantidad, id } = req.body;

    //Ruta para las ventas, guarda el numero de produtos vendidos
    if (cantidad) {
      const [rows] = await connection.execute(
        "INSERT INTO movimiento (accion, nombre, precio, cantidad, caducidad, id_foraneo) " +
          "SELECT ?, nombre, precio_de_compra, ?, caducidad, ? FROM almacen.producto WHERE id = ?",
        [accion, cantidad, id, id]
      );
    } else {
      const [rows] = await connection.execute(
        "INSERT INTO movimiento (accion, nombre, precio, cantidad, caducidad, id_foraneo) " +
          "SELECT ?, nombre, precio_de_compra, cantidad, caducidad, ? FROM almacen.producto WHERE id = ?",
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
