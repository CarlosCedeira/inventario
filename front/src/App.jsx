import React, { useState } from "react";

import RenderComponent from "./components/getComponent";
import Grafica from "./components/graficaProductosTotales";

import "./css/app.css";

function App() {
  const [formData, setFormData] = useState({
    inventario: true,
    movimientos: false,
    datos: false,
    clientes: false,
    sells: false,
  });

  const handleInputChange = (field) => {
    setFormData({
      inventario: field === "inventario",
      movimientos: field === "movimientos",
      datos: field === "datos",
      clientes: field === "clientes",
      sells: field === "sells",
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
            <li>
              <input
                type="button"
                className={formData.sells ? "hidden" : ""}
                value={formData.sells ? "" : "sells"}
                onClick={() => handleInputChange("sells")}
              />
            </li>
          </ol>
        </nav>
      </header>
      <main>
        {formData.inventario ? <RenderComponent ruta="getProducts" /> : null}

        {formData.movimientos ? <RenderComponent ruta="getMovements" /> : null}

        {formData.datos ? <Grafica /> : null}
        {formData.clientes ? <RenderComponent ruta="getClients" /> : null}
        {formData.sells ? <RenderComponent ruta="getSells" /> : null}
      </main>
    </>
  );
}

export default App;
