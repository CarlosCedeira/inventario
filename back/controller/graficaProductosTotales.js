const express = require("express");
const router = express.Router();
const dbConfig = require("../config");
const mysql = require("mysql2/promise");

router.get("/graficaProductosTotales", async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);

  try {
    const [products] = await connection.execute(`
        SELECT id, nombre, categoria, cantidad, precio_de_compra, precio_de_venta, lote, caducidad,
          CASE
            WHEN caducidad < CURRENT_DATE THEN 2
            WHEN caducidad BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL 21 DAY THEN 1
            ELSE 0
          END AS cercano_caducidad
        FROM producto
        ORDER BY nombre ASC
    `);

    const beneficioTotal = products.reduce(
      (acc, product) =>
        acc +
        parseFloat(product.precio_de_venta) * parseFloat(product.cantidad),
      0
    );

    res.json({
      products: products,
      beneficioTotal: beneficioTotal,
    });
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
