const express = require("express");
const router = express.Router();
const dbConfig = require("../config");
const mysql = require("mysql2/promise");

router.put("/:ruta/", async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);
  const ruta = req.params.ruta;

  try {
    let result;
    const { id, nombre } = req.body;
    console.log("rutaedit", ruta);
    switch (ruta) {
      case "putClient":
        const { direccion, correo, telefono } = req.body;
        console.log("ruta putclient", ruta);
        console.log("data");
        console.log(nombre, direccion, correo, telefono, id);
        const [client] = await connection.execute(
          "UPDATE cliente SET nombre = ?, direccion = ?, correo = ?, telefono = ? WHERE id = ?",
          [nombre, direccion, correo, telefono, id]
        );
        result = client;
        console.log("result", result);
        break;

      case "putProduct":
        const { categoria, precio, cantidad, caducidad, lote } = req.body;
        const caducidadFormateada = caducidad.split("T")[0];
        console.log("ruta putproduct", req.params);
        console.log(req.body);
        console.log("caducidadFormateada", caducidadFormateada);
        const [product] = await connection.execute(
          "UPDATE producto SET nombre = ?, categoria = ?, precio = ?, cantidad = ?, caducidad = ?, lote = ? WHERE id = ?",
          [nombre, categoria, precio, cantidad, caducidadFormateada, lote, id]
        );
        result = product;
        console.log("result", result);

        break;

      default:
        throw new Error("Ruta no encontrada");
    }

    if (result.affectedRows > 0) {
      res.status(204).send(result);
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
