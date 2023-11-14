const express = require("express");
const router = express.Router();
const dbConfig = require("./config");
const mysql = require("mysql2/promise");

router.get("/", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute("SELECT * FROM producto");

    connection.end();

    res.json(rows);
  } catch (err) {
    console.error("Error al consultar la base de datos: " + err.message);
    res.status(500).json({ error: "Error al obtener datos de la tabla" });
  }
});

module.exports = router;
