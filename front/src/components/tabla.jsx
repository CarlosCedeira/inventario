import { useEffect, useState } from "react";
import { useContadorContext } from "../context";

import FilaProducto from "./filatabla";
import "../css/Tabla.css";
import AñadirProducto from "./añadirproducto";

function Productos() {
  const { datos, setDatos, contador, setContador } = useContadorContext();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000")
      .then((response) => response.json())
      .then((data) => {
        setDatos(data);
        const tipo = document.getElementById("selecttipo");
        tipo.value = "predefinido";
      })
      .catch((err) => {
        console.error("Error al realizar la solicitud:", err);
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
        item.nombre_producto &&
        item.nombre_producto.toLowerCase().includes(newSearch.toLowerCase())
      );
    });
    setDatos(filteredData);
  };

  const tipoControler = () => {
    const tipo = document.getElementById("selecttipo").value;
    const orden = document.getElementById("selectorden").value;
    let datosOrdenados;

    switch (tipo) {
      case "cantidad":
        orden === "mayor"
          ? (datosOrdenados = [...datos].sort(
              (a, b) => b.cantidad - a.cantidad
            ))
          : (datosOrdenados = [...datos].sort(
              (a, b) => a.cantidad - b.cantidad
            ));

        break;

      case "precio":
        orden === "mayor"
          ? (datosOrdenados = [...datos].sort((a, b) => b.precio - a.precio))
          : (datosOrdenados = [...datos].sort((a, b) => a.precio - b.precio));
        break;

      case "caducidad":
        orden === "mayor"
          ? (datosOrdenados = [...datos].sort(
              (a, b) =>
                b.caducidad.slice(0, 10).split("-").join("") -
                a.caducidad.slice(0, 10).split("-").join("")
            ))
          : (datosOrdenados = [...datos].sort(
              (a, b) =>
                a.caducidad.slice(0, 10).split("-").join("") -
                b.caducidad.slice(0, 10).split("-").join("")
            ));
        break;

      default:
        setContador(contador + 1);
        break;
    }

    if (datosOrdenados) {
      setDatos(datosOrdenados);
    }
  };

  return (
    <>
      {Array.isArray(datos) ? (
        <>
          <AñadirProducto />
          <div style={{ display: "flex" }}>
            <p>Ordenar por</p>
            <select id="selectorden" onChange={tipoControler}>
              <option value="mayor">mayor</option>
              <option value="menor">menor</option>
            </select>

            <select id="selecttipo" onChange={tipoControler}>
              <option value="predefinido">predefinido</option>
              <option value="cantidad">cantidad</option>
              <option value="precio">precio</option>
              <option value="caducidad">caducidad</option>
            </select>
          </div>

          <div style={{ display: "flex" }}>
            <p>Buscar producto:</p>
            <input
              type="search"
              name="search"
              value={search}
              onChange={handleSearchChange}
              placeholder="Escribe un nombre..."
            />
          </div>

          <table>
            <caption>Inventario</caption>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Categoria</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Fecha de caducidad</th>
                <th>Aciones</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((item) => (
                <FilaProducto key={item.id} item={item} />
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>Cargando datos...</p>
      )}
    </>
  );
}

export default Productos;
