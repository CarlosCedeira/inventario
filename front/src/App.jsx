import React, { useState } from "react";

import Productos from "./components/tabla";
import Movimientos from "./components/movimientos";
import ProductosTotales from "./components/graficaProductosTotales";
import Clientes from "./components/clientes/verClientes";

import "./css/app.css";

function App() {
  const [formData, setFormData] = useState({
    inventario: true,
    movimientos: false,
    datos: false,
    clientes: false,
  });

  const handleInputChange = (field) => {
    setFormData({
      inventario: field === "inventario",
      movimientos: field === "movimientos",
      datos: field === "datos",
      clientes: field === "clientes",
    });
  };

  return (
    <>
      <header>
        <nav className="menu">
          <ol>
            <li>
              <input
                type="button"
                className={formData.inventario ? "hidden" : ""}
                value={formData.inventario ? "" : "inventario"}
                onClick={() => handleInputChange("inventario")}
              />
            </li>
            <li>
              <input
                type="button"
                className={formData.movimientos ? "hidden" : ""}
                value={formData.movimientos ? "" : "movimientos"}
                onClick={() => handleInputChange("movimientos")}
              />
            </li>
            <li>
              <input
                type="button"
                className={formData.datos ? "hidden" : ""}
                value={formData.datos ? "" : "datos"}
                onClick={() => handleInputChange("datos")}
              />
            </li>
            <li>
              <input
                type="button"
                className={formData.clientes ? "hidden" : ""}
                value={formData.clientes ? "" : "clientes"}
                onClick={() => handleInputChange("clientes")}
              />
            </li>
          </ol>
        </nav>
      </header>
      <main>
        {formData.inventario ? <Productos /> : null}
        {formData.movimientos ? <Movimientos /> : null}
        {formData.datos ? <ProductosTotales /> : null}
        {formData.clientes ? <Clientes /> : null}
      </main>
    </>
  );
}

export default App;
