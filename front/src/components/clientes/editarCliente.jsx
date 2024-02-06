import { useState } from "react";
import { useContadorContext } from "../../context";

import "../../css/formularioactualizar.css";

function EditarCliente(props) {
  const { id, nombre, direccion, correo, telefono } = props;

  const { contador, setContador } = useContadorContext();
  const [accion, setAccion] = useState(false);
  const [formData, setFormData] = useState({
    id,
    nombre,
    direccion,
    correo,
    telefono,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3000/editarCliente`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          const datos = { accion: "editar", id };

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
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
      });
  };

  return accion ? (
    <div id="oscurecer-fondo">
      <div id="formulario-editar">
        <p onClick={() => setAccion(false)}>❌</p>
        <form onSubmit={handleSubmit}>
          <legend>Editar {nombre}</legend>
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
            Dirección:
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
          <button type="submit">guardar cambios</button>
        </form>
      </div>
    </div>
  ) : (
    <button onClick={() => setAccion(true)}>✏️</button>
  );
}

export default EditarCliente;
