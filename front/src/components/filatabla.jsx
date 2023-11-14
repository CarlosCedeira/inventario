import React from "react";
import EliminarProducto from "./eliminarproducto";
import EditarProducto from "./editarproducto";

function FilaProducto({ item }) {
  return (
    <tr key={item.id}>
      <td>{item.nombre_producto}</td>
      <td>{item.categoria}</td>
      <td>{item.precio}€</td>
      <td>{item.cantidad}</td>
      <td>{item.caducidad.slice(0, 10).split("-").reverse().join("-")}</td>
      <td>
        <EditarProducto
          id={item.id}
          nombre={item.nombre_producto}
          categoria={item.categoria}
          precio={item.precio}
          cantidad={item.cantidad}
          caducidad={item.caducidad.slice(0, 10)}
        />
        <EliminarProducto
          id={item.id}
          nombre={item.nombre_producto}
          precio={item.precio}
          cantidad={item.cantidad}
          caducidad={item.caducidad.slice(0, 10)}
        />
      </td>
    </tr>
  );
}

export default FilaProducto;
