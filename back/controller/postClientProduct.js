const express = require("express");
const router = express.Router();
const dbConfig = require("../config");
const mysql = require("mysql2/promise");

router.post("/:ruta/", async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);
  const ruta = req.params.ruta;

  try {
    let result;
    let insertedId;
    const { nombre } = req.body;

    switch (ruta) {
      case "postClient":
        const { direccion, correo, telefono } = req.body;
        const [client] = await connection.execute(
          "INSERT INTO cliente (nombre, direccion, correo, telefono) VALUES (?, ?, ?, ?)",
          [nombre, direccion, correo, telefono]
        );
        result = client;
        insertedId = client.insertId;
        res.json({ id: insertedId });
        break;

      case "postProduct":
        console.log("req.body post product");
        console.table(req.body);
        const {
          categoria,
          precioCompra,
          precioVenta,
          cantidad,
          caducidad,
          lote,
        } = req.body;
        const caducidadFormateada = caducidad.split("T")[0];
        const [product] = await connection.execute(
          "INSERT INTO producto (nombre, categoria, precio_de_venta, cantidad, caducidad, lote, precio_de_compra) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [
            nombre,
            categoria,
            precioVenta,
            cantidad,
            caducidad,
            lote,
            precioCompra,
          ]
        );
        result = product;
        insertedId = product.insertId;
        res.json({ id: insertedId });
        break;

      default:
        res.status(404).json({ error: "Ruta no encontrada" });
        return; // Asegura que no se siga ejecutando el código después de enviar la respuesta.
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
