const express = require("express");
const router = express.Router();
const dbConfig = require("../../config");
const mysql = require("mysql2/promise");

router.delete("/delteClient/:id", async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);

  try {
    const { id } = req.params;

    const [result] = await connection.execute(
      "DELETE FROM cliente WHERE id = ?",
      [id]
    );

    if (result.affectedRows > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (err) {
    console.error("Error al consultar la base de datos: " + err.message);
    res.status(500).json({ error: "Error al eliminar el producto" });
  } finally {
    if (connection && connection.end) {
      connection.end();
    }
  }
});

module.exports = router;
