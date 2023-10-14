import { useState } from "react";

function Formulario() {
  // Definir estados para los campos del formulario
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [caducidad, setCaducidad] = useState("");

  // Manejar cambios en los campos del formulario
  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleCategoriaChange = (e) => {
    setCategoria(e.target.value);
  };

  const handlePrecioChange = (e) => {
    setPrecio(e.target.value);
  };

  const handleCantidadChange = (e) => {
    setCantidad(e.target.value);
  };

  const handleCaducidadChange = (e) => {
    setCaducidad(e.target.value);
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos a una API o realizar cualquier otra acción
    const datos = {
      nombre,
      categoria,
      precio,
      cantidad,
      caducidad,
    };

    // Configurar la solicitud POST
    fetch("http://localhost:3000/anadir", {
      method: "post",
      headers: {
        "Content-Type": "application/json", // Indicar que los datos son JSON
      },
      body: JSON.stringify(datos), // Convertir los datos a formato JSON
    }).catch((error) => {
      console.error("Error al realizar la solicitud:", error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input type="text" value={nombre} onChange={handleNombreChange} />
      </label>
      <br />
      <label>
        Categoría:
        <input type="text" value={categoria} onChange={handleCategoriaChange} />
      </label>
      <br />
      <label>
        Precio:
        <input type="number" value={precio} onChange={handlePrecioChange} />
      </label>
      <br />
      <label>
        Cantidad:
        <input type="number" value={cantidad} onChange={handleCantidadChange} />
      </label>
      <br />
      <label>
        Fecha de Caducidad:
        <input type="date" value={caducidad} onChange={handleCaducidadChange} />
      </label>
      <br />
      <button type="submit">Añadir producto</button>
    </form>
  );
}

export default Formulario;
