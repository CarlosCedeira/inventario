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
    console.log("rutapost", ruta);
    switch (ruta) {
      case "postClient":
        const { direccion, correo, telefono } = req.body;
        console.log("ruta putclient", ruta);
        console.log("data");
        console.log(nombre, direccion, correo, telefono, id);
        const [client] = await connection.execute(
          "INSERT INTO cliente (nombre, direccion, correo, telefono) VALUES (?, ?, ?, ?)",
          [nombre, direccion, correo, telefono]
        );
        result = client;
        insertedId = client.insertId;

        res.json({ id: insertedId });
        console.log("result", result);
        break;

      case "postProduct":
        const { categoria, precio, cantidad, caducidad, lote } = req.body;
        const caducidadFormateada = caducidad.split("T")[0];
        console.log("ruta putproduct", req.params);
        console.log(req.body);
        console.log("caducidadFormateada", caducidadFormateada);
        const [product] = await connection.execute(
          "INSERT INTO producto (nombre, categoria, precio, cantidad, caducidad, lote) VALUES (?, ?, ?, ?, ?, ?)",
          [nombre, categoria, precio, cantidad, caducidad, lote]
        );
        result = product;
        insertedId = product.insertId;

        res.json({ id: insertedId });
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
