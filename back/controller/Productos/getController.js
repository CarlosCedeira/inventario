const express = require("express");
const router = express.Router();
const dbConfig = require("../../config");
const mysql = require("mysql2/promise");

router.get("/products", async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);

  try {
    const [rows] = await connection.execute(`
    SELECT *,
      CASE
        WHEN caducidad < CURRENT_DATE THEN 2
        WHEN caducidad BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL 21 DAY THEN 1
        ELSE 0
      END AS cercano_caducidad
    FROM producto
`);
    res.json(rows);
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
