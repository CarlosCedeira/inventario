import React, { useState } from "react";

import Productos from "./components/tabla";
import Movimientos from "./components/movimientos";
import ProductosTotales from "./components/graficaProductosTotales";

import "./css/app.css";

function App() {
  const [mostrarMovimientos, setMostrarMovimientos] = useState(false);
  const [verDatos, setVerDatos] = useState(false);

  const handleChangeVisualizer = () => {
    setMostrarMovimientos(!mostrarMovimientos);
  };

  const handleChangeDatos = () => {
    setVerDatos(!verDatos);
  };

  return (
    <>
      <header>
        <nav className="menu">
          <ol>
            <li>
              <input
                type="button"
                className="input"
                value={mostrarMovimientos ? "Inventario" : "Movimientos"}
                onClick={handleChangeVisualizer}
              />
            </li>
            <li>
              <input
                type="button"
                value={verDatos ? "ocultar datos" : "Ver datos"}
                onClick={handleChangeDatos}
              />
            </li>
          </ol>
        </nav>
      </header>
      <main>
        {mostrarMovimientos ? <Movimientos /> : <Productos />}
        {verDatos ? <ProductosTotales /> : null}
      </main>
    </>
  );
}

export default App;
