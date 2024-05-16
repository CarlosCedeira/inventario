const express = require("express");
const router = express.Router();
const dbConfig = require("../../config");
const mysql = require("mysql2/promise");

router.put("/editProduct", async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);

  try {
    const { id, nombre, categoria, precio, cantidad, caducidad, lote } =
      req.body;
    const [result] = await connection.execute(
      "UPDATE producto SET nombre_producto = ?, categoria = ?, precio = ?, cantidad = ?, caducidad = ?, lote = ? WHERE id = ?",
      [nombre, categoria, precio, cantidad, caducidad, lote, id]
    );

    if (result.affectedRows > 0) {
      res.status(204).send();
    } else {
      res.status(405).json({ error: "Producto no encontrado" });
    }
  } catch (err) {
    console.error("Error al consultar la base de datos: " + err.message);
    res.status(500).json({ error: "Error al editar el producto" });
  } finally {
    if (connection && connection.end) {
      connection.end();
    }
  }
});

module.exports = router;
