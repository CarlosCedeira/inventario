import { useState } from "react";
import { useContadorContext } from "../../context";

import "../../css/formularioañadir.css";

function AñadirCliente() {
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    correo: "",
    telefono: "",
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

    fetch("http://localhost:3000/anadirCliente", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
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
          return response.json();
        } else {
          throw new Error("La respuesta no es exitosa");
        }
      })
      .then((data) => {
        const { id } = data;
        const datos = { accion: "nuevo cliente", id };

        fetch("http://localhost:3000/movimiento", {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(datos),
        }).then((response) => {
          if (response.ok) {
            setContador(contador + 1);
            setFormData({
              nombre: "",
              direccion: "",
              correo: "",
              telefono: "",
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
          <legend>Añadir cliente</legend>
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
            Direccion:
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Correo:
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Telefono:
            <input
              type="number"
              name="telefono"
              value={formData.telefono}
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

export default AñadirCliente;
