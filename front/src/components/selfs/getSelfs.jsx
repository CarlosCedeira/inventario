import { useEffect, useState } from "react";
import { useContadorContext } from "../../context";

import DeleteSelf from "../deleteComponent";
import EditClient from "../Clients/putClient";

function Selfs() {
  const { contador, setContador } = useContadorContext();
  const [datos, setDatos] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/selfs")
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
          <caption>Ventas</caption>
          <thead>
            <tr>
              <th>date</th>
              <th>Quantity sold</th>
              <th>Price</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((item) => (
              <tr key={item.id_venta}>
                <td>{item.date}</td>
                <td>{item.quantity_sold}</td>
                <td>{item.unit_price}</td>
                <td>{item.total}</td>
                <td>
                  <EditClient
                    id={item.id}
                    nombre={item.nombre}
                    direccion={item.direccion}
                    correo={item.correo}
                    telefono={item.telefono}
                  />
                  <DeleteSelf id={item.id} ruta="deleteSale" />
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

export default Selfs;
