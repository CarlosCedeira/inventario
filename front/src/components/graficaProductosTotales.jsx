import { useState, useEffect } from "react";

import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";

import "../css/grafica.css";

const ProdutosTotales = () => {
  //const { datos } = useContadorContext();
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/getProducts`)
      .then((response) => {
        if (!response.ok) {
          switch (response.status) {
            case 404:
              throw new Error("Data not found");
            case 500:
              throw new Error("Server error");
            default:
              throw new Error("Network response was not ok");
          }
        }
        return response.json();
      })
      .then((data) => {
        setDatos(data);
        console.table(data);
      })
      .catch((err) => {
        console.error("Error al realizar la solicitud:", err);
      });
  }, []);

  if (!datos.length) {
    return <div>Cargando datos...</div>;
  }

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
    <>
      <section className="primera-section"></section>

      <div className="grafica">
        <h1>
          Productos totales{" "}
          {datos.reduce((acumulador, dato) => acumulador + dato.cantidad, 0)}
        </h1>
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
    </>
  );
};

export default ProdutosTotales;
