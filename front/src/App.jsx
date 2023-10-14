import { useEffect, useState } from "react";
import Formulario from "./components/añadirproducto";

function App() {
  const [datos, setDatos] = useState([]);
  const [estadoInicial, setEstadoInicial] = useState(true);
  const [datosAntiguos, setDatosAntiguos] = useState([]);

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

  const ordenarPorPrecio = (e) => {
    const datosCopia = [...datos]; // Crea una copia del arreglo de datos
    setDatosAntiguos({ ...datos });
    console.log("datos copiados del primer fetch", datosCopia);
    if (estadoInicial) {
      const datosOrdenadosPrecio = datosCopia.sort(
        (a, b) => b.precio - a.precio
      );
      setDatos(datosOrdenadosPrecio);
      setEstadoInicial(false);
      console.log("if", estadoInicial);
    } else {
      console.log("else");
      setDatos(datosCopia);
      setEstadoInicial(true);
      console.log("datosCopia", datosCopia);
    }
  };

  return (
    <>
      <h2>Añadir producto </h2>
      <Formulario />
      {Array.isArray(datos) ? (
        <table>
          <caption>Inventario</caption>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoria</th>
              <th onClick={(e) => ordenarPorPrecio(e)}>Precio</th>
              <th>Cantidad</th>
              <th>Fecha de caducidad</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((item, index) => (
              <tr key={index}>
                <td>{item.nombre_producto}</td>
                <td>{item.categoria}</td>
                <td>{item.precio}€</td>
                <td>{item.cantidad}</td>
                <td>{item.caducidad.slice(0, 10)}</td>
                <td>Elimminar Producto</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Cargando datos...</p>
      )}
    </>
  );
}

export default App;
