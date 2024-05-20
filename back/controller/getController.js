const express = require("express");
const router = express.Router();
const dbConfig = require("../config");
const mysql = require("mysql2/promise");

router.get("/:ruta", async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);

  try {
    const ruta = req.params.ruta;
    console.log("rutaaa", ruta);
    let result;
    switch (ruta) {
      case "getClients":
        console.log("getclients", getclients)[result] =
          await connection.execute("SELECT * FROM almacen.cliente;");

        break;

      case "getProducts":
        await connection.execute(`
        SELECT *,
          CASE
            WHEN caducidad < CURRENT_DATE THEN 2
            WHEN caducidad BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL 21 DAY THEN 1
            ELSE 0
          END AS cercano_caducidad
        FROM producto
    `);

        break;

      default:
        throw new Error("Ruta no encontrada");
    }
    res.json(result);
    if (result.affectedRows > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
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
