import { useContadorContext } from "../context";

function EliminarProducto(props) {
  const { contador, setContador } = useContadorContext();

  const eliminar = () => {
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas eliminar el producto?"
    );

    if (confirmar) {
      fetch(`http://localhost:3000/eliminar/${props.id}`, {
        method: "DELETE",
      })
        .then((response) => {
          console.log(props.id);
          if (response.ok) {
            // La eliminación fue exitosa, puedes realizar otras acciones necesarias.
            console.log("Producto eliminado con éxito.");
            setContador(contador + 1);
          }
        })
        .catch((error) => {
          console.error("Error al realizar la solicitud:", error);
        });
    }
  };

  return <td onClick={eliminar}>Eliminar Producto</td>;
}

export default EliminarProducto;
