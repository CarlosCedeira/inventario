const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const port = 3000;

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
