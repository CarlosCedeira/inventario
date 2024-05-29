const express = require("express");
const router = express.Router();
const dbConfig = require("../../config");
const mysql = require("mysql2/promise");

router.put("/:ruta/", async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);

  try {
    let result;
    const { ruta } = req.params;
    console.log("rutaedit", ruta);

    switch (ruta) {
      case "putClient":
        const {
          id: clientId,
          nombre: clientName,
          direccion,
          correo,
          telefono,
        } = req.body;
        console.log("ruta putclient", ruta);
        const [client] = await connection.execute(
          "UPDATE cliente SET nombre = ?, direccion = ?, correo = ?, telefono = ? WHERE id = ?",
          [clientName, direccion, correo, telefono, clientId]
        );
        result = client;
        break;

      case "putProduct":
        const {
          id: productId,
          nombre,
          categoria,
          precio,
          cantidad,
          caducidad,
          lote,
        } = req.body;
        console.log("ruta putproduct", req.body);
        const [product] = await connection.execute(
          "UPDATE producto SET nombre = ?, categoria = ?, precio = ?, cantidad = ?, caducidad = ?, lote = ? WHERE id = ?",
          [nombre, categoria, precio, cantidad, caducidad, lote, productId]
        );
        result = product;
        console.log("result", result);
        break;

      default:
        throw new Error("Ruta no encontrada");
    }

    if (result.affectedRows > 0) {
      res.status(204).send(); // No Content
    } else {
      res.status(404).json({ error: "Registro no encontrado" });
    }
  } catch (err) {
    console.error("Error al consultar la base de datos: " + err.message);
    res.status(500).json({ error: "Error al actualizar el registro" });
  } finally {
    if (connection && connection.end) {
      connection.end();
    }
  }
});

module.exports = router;

module.exports = router;
