const express = require("express");
const mysql = require("mysql2/promise");
const dbConfig = require("./config");
const cors = require("cors");

const editarController = require("./editarController");
const añadirController = require("./añadirController");
const deleteController = require("./deleteController");
const getController = require("./getController");

const app = express();
app.use(cors());

app.get("/", getController);

app.delete("/eliminar/:id", deleteController);

app.use(express.json());

app.post("/anadir", añadirController);

app.put("/editar", editarController);

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
