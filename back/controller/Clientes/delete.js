const express = require("express");
const router = express.Router();
const dbConfig = require("../../config");
const mysql = require("mysql2/promise");

router.delete("/eliminarCliente/:id", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    const { id } = req.params;

    const [result] = await connection.execute(
      "DELETE FROM cliente WHERE id = ?",
      [id]
    );

    connection.end();

    if (result.affectedRows > 0) {
      res.status(204).send(); // Código de respuesta 204 (Sin contenido)
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (err) {
    console.error("Error al consultar la base de datos: " + err.message);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
});

module.exports = router;
