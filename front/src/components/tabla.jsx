import { useEffect, useState } from "react";
import { useContadorContext } from "../context";
import EliminarProducto from "./eliminarproducto";

function Tabla() {
  const [datos, setDatos] = useState();
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

      /*case "caducidad":
        orden === "caducidad"
          ? (datosOrdenados = [...datos].sort(
              (a, b) => b.caducidad - a.caducidad
            ))
          : (datosOrdenados = [...datos].sort(
              (a, b) => a.caducidad - b.caducidad
            ));
        break;*/

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
          <div /*style={{ display: "flex" }}*/>
            <p>Seleccionar por</p>
            <select id="selecttipo" onChange={tipoControler}>
              <option value="predefinido">predefinido</option>
              <option value="cantidad">cantidad</option>
              <option value="precio">precio</option>
              <option value="caducidad">caducidad</option>
            </select>
            <p>de</p>
            <select id="selectorden" onChange={tipoControler}>
              <option value="mayor">mayor</option>
              <option value="menor">menor</option>
            </select>
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
        </>
      ) : (
        <p>Cargando datos...</p>
      )}
    </>
  );
}

export default Tabla;
