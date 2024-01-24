import React from "react";
import { useContadorContext } from "../context";

import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
  VictoryTheme,
} from "victory";

import "../css/grafica.css";

const ProdutosTotales = () => {
  const { datos } = useContadorContext();

  // Extrae las cantidades y encuentra el valor máximo
  const nombres = datos.map((item) => item.nombre_producto);
  const cantidades = datos.map((item) => item.cantidad);
  const maxValue = Math.max(...cantidades);
  const customTickValues = [
    0,
    Math.round(0.25 * maxValue),
    Math.round(0.5 * maxValue),
    Math.round(0.75 * maxValue),
    Math.round(maxValue),
  ];

  return (
    <div className="grafica">
      <VictoryChart theme={VictoryTheme.material} title="Total de Productos">
        <VictoryBar
          data={cantidades.map((cantidad, index) => ({
            x: nombres[index], // Usar el nombre del producto en lugar del índice
            y: cantidad,
          }))}
          cornerRadius={5}
        />

        {/* Muestra el número máximo sobre el eje Y */}

        <VictoryAxis dependentAxis tickValues={customTickValues} />
      </VictoryChart>
    </div>
  );
};

export default ProdutosTotales;
