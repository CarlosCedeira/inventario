import React from "react";
import { useContadorContext } from "../../context";

import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";

import "../../css/grafica.css";

const ProdutosTotales = () => {
  const { datos } = useContadorContext();

  // Extrae las cantidades y encuentra el valor máximo
  const nombres = datos.map((item) => item.nombre);
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
      <h1>Productos totales</h1>
      <VictoryChart theme={VictoryTheme.material} title="Total de Productos">
        <VictoryBar
          data={cantidades.map((cantidad, index) => ({
            x: nombres[index], // Usar el nombre del producto en lugar del índice
            y: cantidad,
          }))}
          cornerRadius={5}
        />

        <VictoryAxis
          tickValues={nombres} // Utiliza los nombres directamente como valores de las etiquetas
          style={{
            tickLabels: { textAnchor: "middle", fontSize: 15 },
          }}
        />

        <VictoryAxis dependentAxis tickValues={customTickValues} />
      </VictoryChart>
    </div>
  );
};

export default ProdutosTotales;
