const express = require("express");
const router = express.Router();
const dbConfig = require("../../config");
const mysql = require("mysql2/promise");

router.delete("/eliminar/:id", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    const { id } = req.params;

    await connection.execute("DELETE FROM movimiento WHERE id_foraneo = ?", [
      id,
    ]);

    const [result] = await connection.execute(
      "DELETE FROM producto WHERE id = ?",
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
