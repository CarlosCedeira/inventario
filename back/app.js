const express = require("express");
const mysql = require("mysql2/promise");
const dbConfig = require("./config");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute("SELECT * FROM producto");

    connection.end();

    res.json(rows);
  } catch (err) {
    console.error("Error al consultar la base de datos: " + err.message);
    res.status(500).json({ error: "Error al obtener datos de la tabla" });
  }
});

app.delete("/eliminar/:id", async (req, res) => {
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

app.use(express.json());

app.post("/anadir", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    const { nombre, categoria, precio, cantidad, caducidad } = req.body;
    const [rows] = await connection.execute(
      "INSERT INTO producto (nombre_producto, categoria, precio, cantidad, caducidad) VALUES (?, ?, ?, ?, ?)",
      [nombre, categoria, precio, cantidad, caducidad]
    );

    const insertedId = rows.insertId;

    res.json({ id: insertedId });
    connection.end();
  } catch (err) {
    console.error("Error al consultar la base de datos: " + err.message);
    res.status(500).json({ error: "Error al obtener datos de la tabla" });
  }
});

app.put("/editar", async (req, res) => {
  try {
    const { id, nombre, categoria, precio, cantidad, caducidad } = req.body;
    const connection = await mysql.createConnection(dbConfig);

    const [result] = await connection.execute(
      "UPDATE producto SET nombre_producto = ?, categoria = ?, precio = ?, cantidad = ?, caducidad= ? WHERE id = ?",
      [nombre, categoria, precio, cantidad, caducidad, id]
    );

    connection.end();

    if (result) {
      res.status(204).send();
    } else {
      res.status(405).json({ error: "Producto no encontrado" });
    }
  } catch (err) {
    console.error("Error al consultar la base de datos: " + err.message);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
});

app.post("/movimiento", async (req, res) => {
  try {
    const dbConfig2 = {
      host: "localhost",
      user: "root",
      password: "root",
      database: "almacen",
    };

    const connection = await mysql.createConnection(dbConfig2);
    const { accion, id } = req.body;
    console.log(id, accion);

    const [rows] = await connection.execute(
      "INSERT INTO movimiento (accion, nombre, precio, cantidad, caducidad, id_foraneo) " +
        "SELECT ?, nombre_producto, precio, cantidad, caducidad, ? FROM almacen.producto WHERE id = ?",
      [accion, id, id]
    );

    await connection.end();

    res.json(rows);
  } catch (err) {
    console.error("Error al consultar la base de datos: " + err.message);
    res.status(500).json({ error: "Error al obtener datos de la tabla" });
  }
});

app.listen(process.env.port, () => {
  console.log(
    `Servidor Express en funcionamiento en el puerto ${process.env.port}`
  );
});
