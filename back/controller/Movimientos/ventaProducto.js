const express = require("express");
const router = express.Router();
const dbConfig = require("../../config");
const mysql = require("mysql2/promise");

router.post("/anadirventa", async (req, res) => {
  let rows;
  const connection = await mysql.createConnection(dbConfig);
  try {
    const { idProducto, cantidad, idCliente } = req.body;
    console.log(req.body);

    const [rows] = await connection.execute(
      `
  INSERT INTO ventas (id_producto, id_cliente, fecha_venta, cantidad_vendida, precio_unitario, total)
  SELECT 
      p.id, 
      c.id, 
      CURDATE(),  -- o la fecha de la venta
      ?,          -- cantidad vendida como parámetro
      p.precio, 
      p.precio * ?  -- total calculado como precio_unitario * cantidad_vendida
  FROM 
      producto p, 
      cliente c
  WHERE 
      p.id = ?  -- ID del producto vendido como parámetro
      AND c.id = ?;  -- ID del cliente que compra como parámetro
`,
      [cantidad, cantidad, idProducto, idCliente]
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
