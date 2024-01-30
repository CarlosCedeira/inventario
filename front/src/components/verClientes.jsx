import { useEffect, useState } from "react";
import { useContadorContext } from "../context";

import EliminarProducto from "./eliminarproducto";
import EditarProducto from "./editarproducto";

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
                  <EliminarProducto
                    id={item.id}
                    nombre={item.nombreproducto}
                    precio={item.direccion}
                    cantidad={item.correo}
                    caducidad={item.telefono}
                    ruta="eliminarClientes"
                  />
                  <EditarProducto
                    id={item.id}
                    nombreproducto={item.nombreproducto}
                    precio={item.direccion}
                    cantidad={item.correo}
                    caducidad={item.telefono}
                    ruta="editarClientes"
                  />
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
