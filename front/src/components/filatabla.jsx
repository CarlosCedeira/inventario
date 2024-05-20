import DeleteProduct from "./deleteComponent";
import EditProduct from "./products/putProdcut";
import PostSelf from "./selfs/postSelf";

function FilaProducto(props) {
  const { item, columna, ruta } = props;
  let filaStyle = {};

  if (item.cercano_caducidad === 2) {
    filaStyle = { backgroundColor: "red" };
  } else if (item.cercano_caducidad === 1) {
    filaStyle = { backgroundColor: "orange" };
  }

  return (
    <tr>
      {<td>{item[columna[0]]}</td>}
      {<td>{item[columna[1]]}</td>}
      {<td>{item[columna[2]]}</td>}
      {<td>{item[columna[3]]}</td>}
      {<td>{item[columna[4]]}</td>}
      {ruta === "products" ? <td>{item[columna[5]]}</td> : null}
      {ruta === "products" ? <td>{item[columna[6]]}</td> : null}
      {ruta === "products" ? <td>{item[columna[7]]}</td> : null}
      {<PostSelf />}
      {<EditProduct />}
      {<DeleteProduct />}
    </tr>
  );
}

export default FilaProducto;
