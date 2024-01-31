import { useEffect, useState } from "react";
import { useContadorContext } from "../context";

import EliminarProducto from "./eliminarproducto";
import EditarCliente from "./editarCliente";

function Clientes() {
  const [datos, setDatos] = useState([]);
  const { contador, setContador } = useContadorContext();

  useEffect(() => {
    fetch("http://localhost:3000/cliente")
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
          <caption>Clientes</caption>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Direccion</th>
              <th>Correo</th>
              <th>Telefono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((item) => (
              <tr key={item.id}>
                <td>{item.nombre}</td>
                <td>{item.direccion}</td>
                <td>{item.correo}</td>
                <td>{item.telefono}</td>
                <td>
                  <EditarCliente
                    id={item.id}
                    nombre={item.nombre}
                    direccion={item.direccion}
                    correo={item.correo}
                    telefono={item.telefono}
                  />
                  <EliminarProducto id={item.id} ruta="eliminarCliente" />
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

export default Clientes;
