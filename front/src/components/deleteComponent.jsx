import { useState } from "react";
import { useContadorContext } from "../context";

function EliminarProducto(props) {
  const { contador, setContador } = useContadorContext();
  const { rutaFinal, setRutaFinal } = useState("");
  /* if (props.ruta === "getProducts") {
    setRutaFinal("deleteProduct");
  }
  if (props.ruta == "getCLients") {
    setRutaFinal("deleteClient");
  } */
  console.log(props.ruta);
  console.log(rutaFinal);
  const eliminar = () => {
    console.log(props);
    const confirmar = window.confirm(
      `¿Estás seguro de que deseas eliminar el producto?`
    );

    if (confirmar) {
      console.log(rutaFinal, props.id);

      fetch(`http://localhost:3000/${rutaFinal}/${props.id}`, {
        method: "DELETE",
      })
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
