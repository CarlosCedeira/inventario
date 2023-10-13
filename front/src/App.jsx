import { useEffect, useState } from "react";
import Formulario from "./components/añadirproducto";

function App() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDatos(data);
      })
      .catch((err) => {
        console.error("Error al realizar la solicitud:", err);
      });
  }, []);

  return (
    <>
      <h2>Añadir producto </h2>
      <Formulario />
      <h1>Inventario </h1>
      {Array.isArray(datos) ? (
        <table>
          <tr>
            <th>Nombre</th>
            <th>Categoria</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Fecha de caducidad</th>
          </tr>
          {datos.map((e) => (
            <tr key={e.id}>
              <td>{e.nombre_producto}</td>
              <td>{e.categoria}</td>
              <td>{e.precio}</td>
              <td>{e.cantidad}</td>
              <td>{e.caducidad.slice(0, 10)}</td>
            </tr>
          ))}
        </table>
      ) : (
        <p>Cargando datos...</p>
      )}
    </>
  );
}

export default App;
