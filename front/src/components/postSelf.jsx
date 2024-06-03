import { useState, useEffect } from "react";
import { useContadorContext } from "../context";

import "../css/formularioactualizar.css";

function VentaProducto(props) {
  const { nombre, cantidad, lote } = props.data;
  const { contador, setContador } = useContadorContext();
  const [accion, setAccion] = useState(false);
  const [formData, setFormData] = useState(cantidad);
  const [totalClientes, setTotalClientes] = useState({});
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");

  useEffect(() => {
    console.table(props);
    fetch("http://localhost:3000/getClients", {})
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
        setTotalClientes(data);
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "cliente") {
      setClienteSeleccionado(value);
    }
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { id, nombre, categoria, precio, caducidad, lote } = props.data;
    const cantidadResto = cantidad - formData.cantidad;
    console.log(props.data.caducidad);
    const caducidadFormateada = caducidad.split("T")[0];

    fetch("http://localhost:3000/putProduct", {
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
        caducidad: caducidadFormateada,
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
          fetch("http://localhost:3000/addSelf", {
            method: "post",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              idProducto: id,
              cantidad: cantidad - cantidadResto,
              idCliente: +clienteSeleccionado,
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
              {totalClientes.map((cliente) => (
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
