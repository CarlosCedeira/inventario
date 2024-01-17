const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

router.post("/movimiento", async (req, res) => {
  try {
    const dbConfig2 = {
      host: "localhost",
      user: "root",
      password: "root",
      database: "almacen",
    };

    const connection = await mysql.createConnection(dbConfig2);
    const { accion, id } = req.body;

    const [rows] = await connection.execute(
      "INSERT INTO movimiento (accion, nombre, precio, cantidad, caducidad, id_foraneo) " +
        "SELECT ?, nombre_producto, precio, cantidad, caducidad, ? FROM almacen.producto WHERE id = ?",
      [accion, id, id]
    );

    await connection.end();

    res.json(rows);
  } catch (err) {
    console.error("Error al consultar la base de datos: " + err.message);
    res.status(500).json({ error: "Error al obtener datos de la tabla" });
  }
});

module.exports = router;
