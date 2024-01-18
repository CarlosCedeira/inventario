import { useState } from "react";
import { useContadorContext } from "../context";

import "../css/formularioactualizar.css";

function VentaProducto(props) {
  const { id, nombre, categoria, precio, cantidad, caducidad } = props;
  const { contador, setContador } = useContadorContext();
  const [accion, setAccion] = useState(false);
  const [formData, setFormData] = useState({
    id,
    nombre,
    categoria,
    precio,
    cantidad,
    caducidad,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/editar", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          const datos = { accion: "venta", id };

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
              readOnly
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
              readOnly
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
              readOnly
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
              readOnly
            />
          </label>
          <br />
          <button type="submit">guardar cambios</button>
        </form>
      </div>
    </div>
  ) : (
    <button onClick={() => setAccion(true)}>🛒</button>
  );
}

export default VentaProducto;
