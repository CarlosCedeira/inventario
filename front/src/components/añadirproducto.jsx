import { useState } from "react";
import { useContadorContext } from "../context";

function AñadirProducto() {
  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    precio: "",
    cantidad: "",
    caducidad: "",
  });

  const { contador, setContador } = useContadorContext();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/anadir", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Producto añadido con éxito.");
          setContador(contador + 1);
        }
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <legend>Añadir producto</legend>
      <label>
        Nombre:
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Categoría:
        <input
          type="text"
          name="categoria"
          value={formData.categoria}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Precio:
        <input
          type="number"
          name="precio"
          value={formData.precio}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Cantidad:
        <input
          type="number"
          name="cantidad"
          value={formData.cantidad}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Fecha de Caducidad:
        <input
          type="date"
          name="caducidad"
          value={formData.caducidad}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button type="submit">Añadir producto</button>
    </form>
  );
}

export default AñadirProducto;
