import React, { useState, useEffect } from "react";
import { useContadorContext } from "../context";
import "../css/formularioactualizar.css";

function PutComponent(props) {
  const { datos, setDatos, contador, setContador } = useContadorContext();
  const [formData, setFormData] = useState({});
  const [accion, setAccion] = useState(false);
  const { ruta, data } = props;
  useEffect(() => {
    if (ruta === "getClients") {
      setFormData({
        id: data.id,
        nombre: data.nombre,
        direccion: data.direccion,
        correo: data.correo,
        telefono: data.telefono,
      });
    } else if (ruta === "getProducts") {
      setFormData({
        id: data.id,
        nombre: data.nombre,
        categoria: data.categoria,
        precio: data.precio,
        cantidad: data.cantidad,
        lote: data.lote,
        caducidad: data.caducidad,
      });
    }
  }, [props.ruta, props.data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name", name);
    console.log("value", value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let putRuta;
    if (ruta === "getProducts") {
      putRuta = "putProduct";
    }
    if (ruta === "getClients") {
      putRuta = "putClient";
    }
    console.table(formData);
    fetch(`http://localhost:3000/${putRuta}`, {
      method: "put",
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
          const id = formData.id;
          const datos = { accion: "editar", id };

          fetch("http://localhost:3000/postMovement", {
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
        console.error(
          "Error al realizar la solicitud a la ruta postMovement:",
          error
        );
      });
  };

  const renderFormFields = () => {
    if (props.ruta === "getClients") {
      return (
        <>
          <label>
            Dirección:
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
            />
          </label>
          <label>
            Correo:
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
            />
          </label>
          <label>
            Teléfono:
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
            />
          </label>
        </>
      );
    } else if (props.ruta === "getProducts") {
      return (
        <>
          <label>
            Categoría:
            <input
              type="text"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
            />
          </label>
          <label>
            Precio:
            <input
              type="number"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
            />
          </label>
          <label>
            Cantidad:
            <input
              type="number"
              name="cantidad"
              value={formData.cantidad}
              onChange={handleChange}
            />
          </label>
          <label>
            Lote:
            <input
              type="text"
              name="lote"
              value={formData.lote}
              onChange={handleChange}
            />
          </label>
          <label>
            Caducidad:
            {console.log(formData.caducidad)}
            <input
              type="date"
              name="caducidad"
              value={formData.caducidad}
              onChange={handleChange}
            />
          </label>
        </>
      );
    } else {
      return <p>Ruta no reconocida</p>;
    }
  };

  return accion ? (
    <div id="oscurecer-fondo">
      <div id="formulario-editar">
        <p onClick={() => setAccion(false)}>❌</p>
        <form onSubmit={handleSubmit}>
          <legend>Editar {data.nombre}</legend>
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </label>
          {renderFormFields(props.ruta)}
          <button type="submit">guardar cambios</button>
        </form>
      </div>
    </div>
  ) : (
    <button onClick={() => setAccion(true)}>✏️</button>
  );
}

export default PutComponent;
