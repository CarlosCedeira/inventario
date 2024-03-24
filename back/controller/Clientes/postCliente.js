const express = require("express");
const router = express.Router();
const dbConfig = require("../../config");
const mysql = require("mysql2/promise");

router.post("/anadirCliente", async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);

  try {
    const { nombre, direccion, correo, telefono } = req.body;
    const [rows] = await connection.execute(
      "INSERT INTO cliente (nombre, direccion, correo, telefono) VALUES (?, ?, ?, ?)",
      [nombre, direccion, correo, telefono]
    );

    const insertedId = rows.insertId;

    res.json({ id: insertedId });
  } catch (err) {
    console.error("Error al consultar la base de datos: " + err.message);
    res.status(500).json({ error: "Error al obtener datos de la tabla" });
  } finally {
    if (connection && connection.end) {
      connection.end();
    }
  }
});

module.exports = router;
