import { useState } from "react";
import { useContadorContext } from "../../context";

import "../../css/formularioañadir.css";

function AñadirProducto() {
  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    precio: "",
    cantidad: "",
    lote: "",
    caducidad: "",
  });
  const [accion, setAccion] = useState(false);
  const { contador, setContador } = useContadorContext();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAccion(false);

    fetch("http://localhost:3000/anadir", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("La respuesta no es exitosa");
        }
      })
      .then((data) => {
        const { id } = data;
        const datos = { accion: "añadir", id };

        fetch("http://localhost:3000/movimiento", {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(datos),
        }).then((response) => {
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
            setFormData({
              nombre: "",
              categoria: "",
              precio: "",
              cantidad: "",
              caducidad: "",
            });
          }
        });
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
      });
  };

  return accion ? (
    <div id="oscurecer-fondo">
      <div id="formulario-añadir">
        <p onClick={() => setAccion(false)}>❌</p>
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
            Lote:
            <input
              type="text"
              name="lote"
              value={formData.lote}
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
      </div>
    </div>
  ) : (
    <button id="boton-añadir" onClick={() => setAccion(true)}>
      ➕
    </button>
  );
}

export default AñadirProducto;
