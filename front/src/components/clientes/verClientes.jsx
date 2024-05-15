import { useEffect, useState } from "react";
import { useContadorContext } from "../../context";

import AñadirCliente from "./añadirCliente";
import EliminarProducto from "../producto/eliminarproducto";
import EditarCliente from "./editarCliente";

function Clientes() {
  const { contador, setContador } = useContadorContext();
  const [datos, setDatos] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/clients")
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
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
      });
  }, [contador]);

  const handleSearchChange = (e) => {
    if (e.target.value === "") {
      setContador(contador + 1);
    }
    const newSearch = e.target.value;
    setSearch(newSearch);
    const filteredData = datos.filter((item) => {
      return (
        item.nombre &&
        item.nombre.toLowerCase().includes(newSearch.toLowerCase())
      );
    });
    setDatos(filteredData);
  };

  return (
    <>
      <AñadirCliente />
      <p>Buscar cliente:</p>
      <input
        type="search"
        name="search"
        value={search}
        onChange={handleSearchChange}
        placeholder="Escribe un nombre..."
      />
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
