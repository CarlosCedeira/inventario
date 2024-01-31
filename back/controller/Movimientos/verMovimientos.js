const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

router.get("/vermovimientos", async (req, res) => {
  try {
    const dbConfig2 = {
      host: "localhost",
      user: "root",
      password: "root",
      database: "almacen",
    };

    const connection = await mysql.createConnection(dbConfig2);

    const [rows] = await connection.execute(
      "SELECT * FROM movimiento ORDER BY id DESC"
    );

    await connection.end();

    res.json(rows);
  } catch (e) {
    console.error("Error al consultar la base de datos: " + e.message);
    res.status(500).json({ e: "Error al obtener datos de la tabla" });
  }
});

module.exports = router;
