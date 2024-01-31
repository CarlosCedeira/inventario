import React, { useState } from "react";

import Productos from "./components/tabla";
import Movimientos from "./components/movimientos";
import ProductosTotales from "./components/graficaProductosTotales";
import Clientes from "./components/clientes/verClientes";

import "./css/app.css";

function App() {
  const [mostrarMovimientos, setMostrarMovimientos] = useState(false);
  const [verDatos, setVerDatos] = useState(false);
  const [verClientes, setVerClientes] = useState(false);

  const handleChangeVisualizer = () => {
    setMostrarMovimientos(!mostrarMovimientos);
  };

  const handleChangeDatos = () => {
    setVerDatos(!verDatos);
  };

  const handleChangeClientes = () => {
    setVerClientes(!verClientes);
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
                value={verDatos ? "ocultar datos" : "ver datos"}
                onClick={handleChangeDatos}
              />
            </li>
            <li>
              <input
                type="button"
                value={verClientes ? "ocultar clientes" : "ver clientes"}
                onClick={handleChangeClientes}
              />
            </li>
          </ol>
        </nav>
      </header>
      <main>
        {mostrarMovimientos ? <Movimientos /> : <Productos />}
        {verDatos ? <ProductosTotales /> : null}
        {verClientes ? <Clientes /> : null}
      </main>
    </>
  );
}

export default App;
