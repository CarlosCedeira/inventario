const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

router.post("/movimiento", async (req, res) => {
  let rows;

  try {
    const { accion, cantidad, id } = req.body;

    const dbConfig2 = {
      host: "localhost",
      user: "root",
      password: "root",
      database: "almacen",
    };

    const connection = await mysql.createConnection(dbConfig2);

    //Ruta para las ventas guarda el numero de produtos vendidos
    if (cantidad) {
      const [rows] = await connection.execute(
        "INSERT INTO movimiento (accion, nombre, precio, cantidad, caducidad, id_foraneo) " +
          "SELECT ?, nombre_producto, precio, ?, caducidad, ? FROM almacen.producto WHERE id = ?",
        [accion, cantidad, id, id]
      );
    } else {
      const [rows] = await connection.execute(
        "INSERT INTO movimiento (accion, nombre, precio, cantidad, caducidad, id_foraneo) " +
          "SELECT ?, nombre_producto, precio, cantidad, caducidad, ? FROM almacen.producto WHERE id = ?",
        [accion, id, id]
      );
    }
    await connection.end();

    res.json(rows);
  } catch (err) {
    console.error("Error al consultar la base de datooos: " + err.message);
    res.status(500).json({ error: "Error al obtener datos de la tabla" });
  }
});

module.exports = router;
