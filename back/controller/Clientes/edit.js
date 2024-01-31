const express = require("express");
const router = express.Router();
const dbConfig = require("../../config");
const mysql = require("mysql2/promise");

router.put("/editarCliente", async (req, res) => {
  try {
    const { id, nombre, direccion, correo, telefono } = req.body;
    const connection = await mysql.createConnection(dbConfig);

    const [result] = await connection.execute(
      "UPDATE cliente SET nombre = ?, direccion = ?, correo = ?, telefono = ? WHERE id = ?",
      [nombre, direccion, correo, telefono, id]
    );

    connection.end();

    if (result.affectedRows > 0) {
      res.status(204).send();
    } else {
      res.status(405).json({ error: "Cliente no encontrado" });
    }
  } catch (err) {
    console.error("Error al consultar la base de datos: " + err.message);
    res.status(500).json({ error: "Error al editar el cliente" });
  }
});

module.exports = router;
