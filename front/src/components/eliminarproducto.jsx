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
            setContador(contador + 1);
          }
        })
        /*  
       
       Al borrar un registro de la tabla inventario no aparece 
       en la tabla movimientos porqué la tabla movimientos tiene el efecto cascada.

       .then((response) => {
          if (response.ok) {
            const datos = { accion: "Eiminar", id: props.id };

            fetch("http://localhost:3000/movimiento", {
              method: "post",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(datos),
            }).then((response) => {
              if (response.ok) {
                setContador(contador + 1);
                setAccion(false);
              }
            });
          }
        }) */
        .catch((error) => {
          console.error("Error al realizar la solicitud:", error);
        });
    }
  };

  return <button onClick={eliminar}>🗑️</button>;
}

export default EliminarProducto;
