import React, { useState } from "react";

import Products from "./components/table";
import Movements from "./components/movements/movements";
import Grafica from "./components/graficas/graficaProductosTotales";
import Clients from "./components//Clients/getClients";
import Selfs from "./components//selfs/getSelfs";

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
        {formData.inventario ? <Products /> : null}
        {formData.movimientos ? <Movements /> : null}
        {formData.datos ? <Grafica /> : null}
        {formData.clientes ? <Clients /> : null}
        <Selfs />
      </main>
    </>
  );
}

export default App;
