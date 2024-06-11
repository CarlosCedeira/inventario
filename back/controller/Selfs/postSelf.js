const express = require("express");
const router = express.Router();
const dbConfig = require("../../config");
const mysql = require("mysql2/promise");

router.post("/addSelf", async (req, res) => {
  let rows;
  const connection = await mysql.createConnection(dbConfig);
  try {
    const { idProducto, cantidad, idCliente } = req.body;
    console.log("req.body");
    console.log(idProducto, cantidad, idCliente);

    const [rows] = await connection.execute(
      `
  INSERT INTO sales (product_id, client_id, date, quantity_sold, unit_price)
  SELECT 
      p.id, 
      c.id, 
      CURDATE(),  -- o la fecha de la venta
      ?,          -- cantidad vendida como parámetro
      p.precio_de_venta 
  FROM 
      producto p, 
      cliente c
  WHERE 
      p.id = ?  -- ID del producto vendido como parámetro
      AND c.id = ?;  -- ID del cliente que compra como parámetro
`,
      [cantidad, idProducto, idCliente]
    );

    res.json(rows);
  } catch (err) {
    console.error("Error al consultar la base de datooos: " + err.message);
    res.status(500).json({ error: "Error al obtener datos de la tabla" });
  } finally {
    if (connection && connection.end) {
      connection.end();
    }
  }
});

module.exports = router;
