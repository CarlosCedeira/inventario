import { useState, useEffect } from "react";
import ProdutosTotales from "./graficaProductosTotales";
import GraficaPorcentage from "./graficaPorcentaje";

import "../css/graficasController.css";

const GraficasController = () => {
  const [componente, setComponente] = useState(<ProdutosTotales />);
  const [selectedButton, setSelectedButton] = useState("A");

  useEffect(() => {
    setComponente(<ProdutosTotales />);
  }, []);

  const renderComponenteA = () => {
    setComponente(<ProdutosTotales />);
    setSelectedButton("A");
  };

  const renderComponenteB = () => {
    setComponente(<GraficaPorcentage />);
    setSelectedButton("B");
  };

  return (
    <div>
      <button
        onClick={renderComponenteA}
        className={selectedButton === "A" ? "selected" : ""}
      >
        Productos totales
      </button>
      <button
        onClick={renderComponenteB}
        className={selectedButton === "B" ? "selected" : ""}
      >
        Balance
      </button>
      <div>{componente}</div>
    </div>
  );
};

export default GraficasController;
