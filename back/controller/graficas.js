const express = require("express");
const router = express.Router();
const dbConfig = require("../config");
const mysql = require("mysql2/promise");

router.get("/grafica/:ruta", async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);

  try {
    const ruta = req.params.ruta;
    console.log("ruta", req.params.ruta);
    let result;

    switch (ruta) {
      case "productos":
        const [data] = await connection.execute(
          `SELECT nombre, cantidad
            FROM producto
            ORDER BY nombre ASC`
        );
        const total = await connection.execute(`
            SELECT SUM(cantidad) AS total
            FROM producto;`);

        result = {
          data: data,
          total: total[0][0].total, // Usar total[0] ya que la consulta devuelve un array de un solo objeto
        };
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
