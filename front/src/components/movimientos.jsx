import { useEffect, useState } from "react";
import { useContadorContext } from "../context";

function Movimientos() {
  const [datos, setDatos] = useState([]);
  const { contador, setContador } = useContadorContext();

  useEffect(() => {
    fetch("http://localhost:3000/vermovimientos")
      .then((response) => response.json())
      .then((data) => {
        setDatos(data);
      })
      .catch((err) => {
        console.error("Error al realizar la solicitud:", err);
      });
  }, [contador]);

  return (
    <>
      {Array.isArray(datos) ? (
        <table>
          <caption>Movimientos</caption>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Aciones</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Fecha de caducidad</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((item) => (
              <tr key={item.id}>
                <td>{item.nombre}</td>
                <td>{item.accion}</td>
                <td>{item.precio}€</td>
                <td>{item.cantidad}</td>
                <td>
                  {item.caducidad.slice(0, 10).split("-").reverse().join("-")}
                </td>
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

export default Movimientos;
