const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const dbConfig = require("../../config");

router.get("/movements", async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);

  try {
    const [rows] = await connection.execute(
      "SELECT * FROM movimiento ORDER BY id DESC"
    );

    res.json(rows);
  } catch (e) {
    console.error("Error al consultar la base de datos: " + e.message);
    res.status(500).json({ e: "Error al obtener datos de la tabla" });
  } finally {
    if (connection && connection.end) {
      connection.end();
    }
  }
});

module.exports = router;
