const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

router.get("/cliente", async (req, res) => {
  try {
    const dbConfig2 = {
      host: "localhost",
      user: "root",
      password: "root",
      database: "almacen",
    };

    const connection = await mysql.createConnection(dbConfig2);

    const [rows] = await connection.execute("SELECT * FROM almacen.cliente;");

    await connection.end();

    res.json(rows);
  } catch (err) {
    console.error("Error al consultar la base de datooos: " + err.message);
    res.status(500).json({ error: "Error al obtener datos de la tabla" });
  }
});

module.exports = router;
