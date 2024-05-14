import EliminarProducto from "./producto/eliminarproducto";
import EditarProducto from "./producto/editarproducto";
import VentaProducto from "./producto/VentaProducto";

function FilaProducto({ item }) {
  let filaStyle = {};

  if (item.cercano_caducidad === 2) {
    filaStyle = { backgroundColor: "red" };
  } else if (item.cercano_caducidad === 1) {
    filaStyle = { backgroundColor: "orange" };
  }

  return (
    <tr key={item.id} style={filaStyle}>
      <td>{item.nombre_producto}</td>
      <td>{item.categoria}</td>
      <td>{item.precio}€</td>
      <td>{item.cantidad}</td>
      <td>{item.lote}</td>
      <td>{item.caducidad.slice(0, 10).split("-").reverse().join("-")}</td>
      <td>
        <VentaProducto
          id={item.id}
          nombre={item.nombre_producto}
          categoria={item.categoria}
          precio={item.precio}
          cantidad={item.cantidad}
          lote={item.lote}
          caducidad={item.caducidad.slice(0, 10)}
        />
        <EditarProducto
          id={item.id}
          nombre={item.nombre_producto}
          categoria={item.categoria}
          precio={item.precio}
          cantidad={item.cantidad}
          lote={item.lote}
          caducidad={item.caducidad.slice(0, 10)}
        />
        <EliminarProducto id={item.id} />
      </td>
    </tr>
  );
}

export default FilaProducto;
