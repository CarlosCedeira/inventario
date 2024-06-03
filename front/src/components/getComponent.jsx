import { useEffect, useState } from "react";
import { useContadorContext } from "../context";

import PostSale from "./postSelf";
import PostFormClientProduct from "./postFormClientProduct";
import PutComponent from "./putFromClientProduct";
import DeleteComponent from "./deleteComponent";

import "../css/Tabla.css";

function GetComponent(props) {
  const { datos, setDatos, contador, setContador } = useContadorContext();
  const [search, setSearch] = useState("");
  const [columna, setColumna] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/${props.ruta}`)
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
        const nombresColumna = Object.keys(data[0]);
        setDatos(data);
        setColumna(nombresColumna);
        const tipo = document.getElementById("selecttipo");
        tipo.value = "predefinido";
      })
      .catch((err) => {
        console.error("Error al realizar la solicitud:", err);
      });
  }, [contador, setDatos]);

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
          <PostFormClientProduct ruta={props.ruta} data={datos} />
          <div className="filtradodedatos">
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

            <input
              type="search"
              name="search"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search..."
            />
          </div>
          <table>
            <caption>{props.ruta}</caption>
            <thead>
              <tr>
                {columna.map(
                  (item, index) =>
                    item !== "id" &&
                    item !== "id_foraneo" &&
                    item !== "cercano_caducidad" && <th key={index}>{item}</th>
                )}
                {(props.ruta === "getProducts" ||
                  props.ruta === "getClients") && <th>Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {datos.map((fila, indiceFila) => (
                <tr key={indiceFila}>
                  {columna.map(
                    (columna, indiceColumna) =>
                      columna !== "id" &&
                      columna !== "id_foraneo" &&
                      columna !== "cercano_caducidad" &&
                      (columna === "caducidad" ? (
                        <td key={indiceColumna}>
                          {fila[columna].split("T")[0]}
                        </td>
                      ) : (
                        <td key={indiceColumna}>{fila[columna]}</td>
                      ))
                  )}
                  {(props.ruta === "getProducts" ||
                    props.ruta === "getClients") && (
                    <td>
                      <PutComponent ruta={props.ruta} data={fila} />
                      {props.ruta === "getProducts" ? (
                        <PostSale data={fila} />
                      ) : null}
                      <DeleteComponent id={fila.id} ruta={props.ruta} />
                    </td>
                  )}
                </tr>
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

export default GetComponent;
