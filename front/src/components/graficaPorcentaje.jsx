import { useState, useEffect } from "react";
import { VictoryPie } from "victory";

const GraficaPorcentage = () => {
  const [totals, setTotals] = useState({ totalCompra: 0, totalVenta: 0 });

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
        calculateTotals(data);
      })
      .catch((err) => {
        console.error("Error al realizar la solicitud:", err);
      });
  }, []);

  const calculateTotals = (data) => {
    let totalCompra = 0;
    let totalVenta = 0;

    data.forEach((item) => {
      totalCompra += parseFloat(item.precio_de_compra) * item.cantidad;
      totalVenta += parseFloat(item.precio_de_venta) * item.cantidad;
    });

    setTotals({ totalCompra, totalVenta });
  };

  const dataPredefinida = [
    { x: "Para vender", y: totals.totalVenta },
    { x: "Comprado", y: totals.totalCompra },
  ];

  return (
    <div className="grafica">
      <h2>Información de caja</h2>
      <VictoryPie
        data={dataPredefinida}
        colorScale={["cyan", "tomato", "orange", "gold", "navy"]}
        radius={100}
        innerRadius={50}
        labels={({ datum }) => `${datum.x}: ${datum.y.toFixed(2)}€`}
        labelRadius={100} // Ajusta la posición de las etiquetas
        height={200}
        style={{
          labels: { fontSize: 10, fill: "black" }, // Ajusta el tamaño y color de las etiquetas
        }}
      />
    </div>
  );
};

export default GraficaPorcentage;
