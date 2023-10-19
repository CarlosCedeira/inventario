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
          if (response.ok) {
            console.log("Producto eliminado con éxito.");
            setContador(contador + 1);
          }
        })
        .catch((error) => {
          console.error("Error al realizar la solicitud:", error);
        });
    }
  };

  return <button onClick={eliminar}>🗑️</button>;
}

export default EliminarProducto;
