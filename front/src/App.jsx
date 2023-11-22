import React, { useState } from "react";
import Productos from "./components/tabla";
import Movimientos from "./components/movimientos";

function App() {
  const [mostrarMovimientos, setMostrarMovimientos] = useState(false);

  const handleChangeVisualizer = () => {
    setMostrarMovimientos(!mostrarMovimientos);
  };

  return (
    <>
      <input
        type="button"
        value={mostrarMovimientos ? "Ver Inventario" : "Ver Movimientos"}
        onClick={handleChangeVisualizer}
        style={{
          display: "inline-block",
          margin: "5px 10px",
          padding: "5px 10px",
          backgroundColor: "#1c80f3",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          textAlign: "center",
          cursor: "pointer",
        }}
      />

      {mostrarMovimientos ? <Movimientos /> : <Productos />}
    </>
  );
}

export default App;
