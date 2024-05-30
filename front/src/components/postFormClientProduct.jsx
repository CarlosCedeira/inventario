import React, { useState, useEffect } from "react";
import { useContadorContext } from "../context";
import "../css/formularioactualizar.css";

function PostFormClientProduct(props) {
  const { contador, setContador } = useContadorContext();
  const [formData, setFormData] = useState({});
  const [accion, setAccion] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let postRuta;
    if (props.ruta === "getProducts") {
      postRuta = "postProduct";
    }
    if (props.ruta === "getClients") {
      postRuta = "postClient";
    }
    fetch(`http://localhost:3000/${postRuta}`, {
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

        fetch("http://localhost:3000/postMovement", {
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
            setAccion(!accion);
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

  const renderFormFields = () => {
    if (props.ruta === "getClients") {
      return (
        <>
          <label>
            Dirección:
            <input type="text" name="direccion" onChange={handleChange} />
          </label>
          <label>
            Correo:
            <input type="email" name="correo" onChange={handleChange} />
          </label>
          <label>
            Teléfono:
            <input type="tel" name="telefono" onChange={handleChange} />
          </label>
        </>
      );
    } else if (props.ruta === "getProducts") {
      return (
        <>
          <label>
            Categoría:
            <input type="text" name="categoria" onChange={handleChange} />
          </label>
          <label>
            Precio:
            <input type="number" name="precio" onChange={handleChange} />
          </label>
          <label>
            Cantidad:
            <input type="number" name="cantidad" onChange={handleChange} />
          </label>
          <label>
            Lote:
            <input type="text" name="lote" onChange={handleChange} />
          </label>
          <label>
            Caducidad:
            <input type="date" name="caducidad" onChange={handleChange} />
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
          <legend>Editar {formData.nombre}</legend>
          <label>
            Nombre:
            <input type="text" name="nombre" onChange={handleChange} />
          </label>
          {renderFormFields(props.ruta)}
          <button type="submit">guardar cambios</button>
        </form>
      </div>
    </div>
  ) : (
    <button id="boton-añadir" onClick={() => setAccion(true)}>
      ➕
    </button>
  );
}

export default PostFormClientProduct;
