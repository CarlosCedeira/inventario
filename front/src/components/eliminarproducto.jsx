function EliminarProducto(props) {
  const eliminar = () => {
    /*const confirmar = confirm(
      "¿Estás seguro de que deseas eliminar el producto?"
    );
    if (confirmar) {
      */ console.log(props.id);
    fetch("http://localhost:3000/eliminar", {
      method: "delete",
      headers: {
        id: props.id,
      },
    }).catch((error) => {
      console.error("Error al realizar la solicitud:", error);
    });
    /*
    }
  */
  };

  return <td onClick={() => eliminar()}>Eliminar Producto</td>;
}

export default EliminarProducto;
