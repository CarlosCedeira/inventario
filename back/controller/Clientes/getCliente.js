const express = require("express");
const router = express.Router();
const dbConfig = require("../../config");

const mysql = require("mysql2/promise");

router.get("/cliente", async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);

  try {
    const [rows] = await connection.execute("SELECT * FROM almacen.cliente;");

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
