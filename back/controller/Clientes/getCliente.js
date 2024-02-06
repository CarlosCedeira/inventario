const express = require("express");
const router = express.Router();
const dbConfig = require("../../config");

const mysql = require("mysql2/promise");

router.get("/cliente", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute("SELECT * FROM almacen.cliente;");

    await connection.end();

    res.json(rows);
  } catch (err) {
    console.error("Error al consultar la base de datooos: " + err.message);
    res.status(500).json({ error: "Error al obtener datos de la tabla" });
  }
});

module.exports = router;
