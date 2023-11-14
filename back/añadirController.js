const express = require("express");
const router = express.Router();
const dbConfig = require("./config");
const mysql = require("mysql2/promise");

router.post("/anadir", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    const { nombre, categoria, precio, cantidad, caducidad } = req.body;
    const [rows] = await connection.execute(
      "INSERT INTO producto (nombre_producto, categoria, precio, cantidad, caducidad) VALUES (?, ?, ?, ?, ?)",
      [nombre, categoria, precio, cantidad, caducidad]
    );

    const insertedId = rows.insertId;

    res.json({ id: insertedId });
    connection.end();
  } catch (err) {
    console.error("Error al consultar la base de datos: " + err.message);
    res.status(500).json({ error: "Error al obtener datos de la tabla" });
  }
});

module.exports = router;
