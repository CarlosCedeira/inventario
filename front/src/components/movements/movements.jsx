import { useEffect, useState } from "react";
import { useContadorContext } from "../../context";

function Movimientos() {
  const [datos, setDatos] = useState([]);
  const { contador } = useContadorContext();

  useEffect(() => {
    fetch("http://localhost:3000/movements")
      .then((response) => {
        if (!response.ok) {
          switch (response.status) {
            case 404:
              throw new Error("Data not found");
            case 500:
              throw new Error("Server error");
            default:
              throw new Error("Network response was not ok");
          }
        }
        return response.json();
      })
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
