import { useState, useEffect } from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryTooltip,
} from "victory";

const ProdutosTotales = () => {
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
  const colors = ["#FF8C00", "#FF6347", "#009EA1", "#FFD700"]; // Colores personalizados

  return (
    <div className="grafica">
      <h2>
        Productos totales{" "}
        {datos.reduce((acumulador, dato) => acumulador + dato.cantidad, 0)}
      </h2>
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryBar
          data={cantidades.map((cantidad, index) => ({
            x: nombres[index],
            y: cantidad,
            label: `${nombres[index]}: ${cantidad}`, // Añade tanto el nombre como la cantidad
            fill: colors[index % colors.length], // Asigna colores cíclicamente
          }))}
          cornerRadius={3}
          labelComponent={<VictoryTooltip />}
          style={{
            data: {
              fill: ({ datum }) => datum.fill, // Usa el color especificado en el objeto de datos
              fillOpacity: 0.7,
              stroke: "#000", // Color del borde (puedes ajustarlo según tus necesidades)
              strokeWidth: 1, // Ancho del borde
              cursor: "pointer",
            },
          }}
          events={[
            {
              target: "data",
              eventHandlers: {
                onClick: (evt, props) => {
                  //console.log(props.datum.xName); // Renderizar información del dato en la consola
                  //console.log(datos); // Renderizar información del dato en la consola
                  let total = 0;
                  datos.map((item) => {
                    total += item.cantidad;
                  });
                  datos.map((item) => {
                    if (item.nombre === props.datum.xName) {
                      console.log(total);
                      console.log((item.cantidad * 100) / total);
                    }
                  });
                },
              },
            },
          ]}
        />
        <VictoryAxis dependentAxis tickValues={customTickValues} />
      </VictoryChart>
    </div>
  );
};

export default ProdutosTotales;
