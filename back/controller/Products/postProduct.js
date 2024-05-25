const express = require("express");
const router = express.Router();
const dbConfig = require("../../config");
const mysql = require("mysql2/promise");

router.post("/postProduct", async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);
  console.log("req.body", req.body);

  try {
    const { nombre, categoria, precio, cantidad, caducidad, lote } = req.body;
    const [rows] = await connection.execute(
      "INSERT INTO producto (nombre, categoria, precio, cantidad, caducidad, lote) VALUES (?, ?, ?, ?, ?, ?)",
      [nombre, categoria, precio, cantidad, caducidad, lote]
    );

    const insertedId = rows.insertId;

    res.json({ id: insertedId });
    console.log("inserted id", insertedId);
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
