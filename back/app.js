const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "almacen",
};

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    // Realiza una consulta a la tabla
    const [rows] = await connection.execute("SELECT * FROM producto");

    connection.end(); // Cierra la conexión

    res.json(rows);
  } catch (err) {
    console.error("Error al consultar la base de datos: " + err.message);
    res.status(500).json({ error: "Error al obtener datos de la tabla" });
  }
});

app.delete("/eliminar", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    const { id } = req.headers; // Asumo que estás pasando el ID del producto a eliminar en req.body
    console.log(id);

    // Realiza la consulta para eliminar el producto
    const [result] = await connection.execute(
      "DELETE FROM producto WHERE id = ?",
      [id]
    );

    connection.end(); // Cierra la conexión

    if (result.affectedRows > 0) {
      // La operación de eliminación se realizó con éxito
      res.status(204).send(); // Código de respuesta 204 (Sin contenido)
    } else {
      // El producto no se encontró en la base de datos
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
    // Realiza una consulta a la tabla
    const [rows] = await connection.execute(
      "INSERT INTO producto (nombre_producto, categoria, precio, cantidad, caducidad) VALUES (?, ?, ?, ?, ?)",
      [nombre, categoria, precio, cantidad, caducidad]
    );

    connection.end(); // Cierra la conexión

    res.json(rows);
  } catch (err) {
    console.error("Error al consultar la base de datos: " + err.message);
    res.status(500).json({ error: "Error al obtener datos de la tabla" });
  }
});

app.listen(port, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${port}`);
});
