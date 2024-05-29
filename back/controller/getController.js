const express = require("express");
const router = express.Router();
const dbConfig = require("../config");
const mysql = require("mysql2/promise");

router.get("/:ruta", async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);

  try {
    const ruta = req.params.ruta;
    console.log("ruta", req.params.ruta);
    let result;

    switch (ruta) {
      case "getClients":
        const [clients] = await connection.execute("SELECT * FROM cliente");
        result = clients;
        break;

      case "getProducts":
        const [products] = await connection.execute(`
          SELECT *,
            CASE
              WHEN caducidad < CURRENT_DATE THEN 2
              WHEN caducidad BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL 21 DAY THEN 1
              ELSE 0
            END AS cercano_caducidad
          FROM producto
        `);
        result = products;
        break;

      case "getMovements":
        console.log("getmovementes");
        const [movements] = await connection.execute(
          "SELECT * FROM movimiento ORDER BY id DESC"
        );
        result = movements;
        break;

      case "getSells":
        const [sells] = await connection.execute("SELECT * FROM sales");
        result = sells;

        break;

      default:
        throw new Error("Ruta no encontrada");
    }
    res.json(result);
  } catch (err) {
    console.error(
      "Error al consultar la base de datos en la ruta: " + err.message
    );
    res.status(500).json({ error: "Error al obtener informacion" });
  } finally {
    if (connection && connection.end) {
      connection.end();
    }
  }
});

module.exports = router;
