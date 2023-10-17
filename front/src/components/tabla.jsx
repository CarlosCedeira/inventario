import { useEffect, useState } from "react";
import EliminarProducto from "./eliminarproducto";
import { useContadorContext } from "../context";

function Tabla() {
  const [datos, setDatos] = useState([]);
  const [estadoInicial, setEstadoInicial] = useState(true);
  const { contador, setContador } = useContadorContext();

  useEffect(() => {
    fetch("http://localhost:3000")
      .then((response) => response.json())
      .then((data) => {
        setDatos(data);
      })
      .catch((err) => {
        console.error("Error al realizar la solicitud:", err);
      });
  }, [contador]);

  const ordenarPorPrecio = () => {
    const datosCopia = [...datos];
    if (estadoInicial) {
      const datosOrdenadosPrecio = datosCopia.sort(
        (a, b) => b.precio - a.precio
      );
      setDatos(datosOrdenadosPrecio);
      setEstadoInicial(false);
    } else {
      setContador(contador + 1);
      setEstadoInicial(true);
    }
  };

  const ordenarPorCantidad = () => {
    const datosCopia = [...datos];
    if (estadoInicial) {
      const datosOrdenadosCantidad = datosCopia.sort(
        (a, b) => b.cantidad - a.cantidad
      );
      setDatos(datosOrdenadosCantidad);
      setEstadoInicial(false);
    } else {
      setContador(contador + 1);
      setEstadoInicial(true);
    }
  };

  return (
    <>
      {Array.isArray(datos) ? (
        <table>
          <caption>Inventario</caption>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoria</th>
              <th onClick={ordenarPorPrecio}>Precio</th>
              <th onClick={ordenarPorCantidad}>Cantidad</th>
              <th>Fecha de caducidad</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((item) => (
              <tr key={item.id}>
                <td>{item.nombre_producto}</td>
                <td>{item.categoria}</td>
                <td>{item.precio}€</td>
                <td>{item.cantidad}</td>
                <td>{item.caducidad.slice(0, 10)}</td>
                <EliminarProducto id={item.id} />
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

export default Tabla;
