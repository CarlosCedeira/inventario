const express = require("express");
const router = express.Router();
const dbConfig = require("../config");
const mysql = require("mysql2/promise");

router.get("/:ruta", async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);

  try {
    const ruta = req.params.ruta;
    console.log("ruta", ruta);
    let result;

    switch (ruta) {
      case "getClients":
        console.log("case getclients");
        console.log("ruta", ruta);
        const [clients] = await connection.execute(
          "SELECT * FROM almacen.cliente"
        );
        result = clients;
        break;

      case "getProducts":
        console.log("case getproducts");
        console.log("ruta", ruta);
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

      default:
        throw new Error("Ruta no encontrada");
    }
    console.log("result", result);
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
