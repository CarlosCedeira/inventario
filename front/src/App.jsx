import React, { useState } from "react";

import Productos from "./components/tabla";
import Movimientos from "./components/movimientos";
import ChartExample from "./components/grafica";

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
                value={
                  mostrarMovimientos ? "Ver Inventario" : "Ver Movimientos"
                }
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
      <body>
        {verDatos ? <ChartExample /> : null}
        {mostrarMovimientos ? <Movimientos /> : <Productos />}
      </body>
    </>
  );
}

export default App;
