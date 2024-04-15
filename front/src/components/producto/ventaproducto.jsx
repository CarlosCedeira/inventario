import { useState, useEffect } from "react";
import { useContadorContext } from "../../context";

import "../../css/formularioactualizar.css";

function VentaProducto(props) {
  const { nombre, cantidad, lote } = props;
  const { contador, setContador } = useContadorContext();
  const [accion, setAccion] = useState(false);
  const [formData, setFormData] = useState(cantidad);
  const [clientes, setClientes] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/cliente", {})
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

        return response.json();
      })
      .then((data) => {
        setClientes(data);
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cantidadResto = cantidad - formData.cantidad;
    const { id, nombre, categoria, precio, caducidad, lote } = props;

    fetch("http://localhost:3000/editar", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        nombre,
        categoria,
        precio,
        cantidad: cantidadResto,
        caducidad,
        lote,
      }),
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
          fetch("http://localhost:3000/movimiento", {
            method: "post",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              accion: "venta",
              id,
              cantidad: cantidad - cantidadResto,
            }),
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
          <legend>
            Vender {nombre} lote {lote}
          </legend>
          <label>
            Cliente:
            <select name="cliente" onChange={handleInputChange}>
              <option value="">Seleccionar Cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nombre}
                </option>
              ))}
            </select>
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
          <button type="submit">guardar cambios</button>
        </form>
      </div>
    </div>
  ) : (
    <button onClick={() => setAccion(true)}>🛒</button>
  );
}

export default VentaProducto;
