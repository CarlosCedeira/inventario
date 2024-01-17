import React from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from "victory";
import { useContadorContext } from "../context";

const ChartExample = () => {
  const { datos } = useContadorContext();

  // Extrae las cantidades y encuentra el valor máximo
  const nombres = datos.map((item) => item.nombre_producto);
  const cantidades = datos.map((item) => item.cantidad);
  const maxCantidad = Math.max(...cantidades);

  return (
    <VictoryChart>
      <VictoryBar
        data={cantidades.map((cantidad, index) => ({
          x: nombres[index], // Usar el nombre del producto en lugar del índice
          y: cantidad,
        }))}
      />

      {/* Muestra el número máximo sobre el eje Y */}
      <VictoryLabel
        text={maxCantidad.toString()}
        x={10} // Ajusta la posición en el eje X según tus necesidades
        y={maxCantidad - 50} // Ajusta la posición en el eje Y según tus necesidades
        textAnchor="start" // Centra el texto en el punto especificado
      />

      <VictoryAxis />
    </VictoryChart>
  );
};

export default ChartExample;
