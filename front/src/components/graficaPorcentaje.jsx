import { useState, useEffect } from "react";
import { VictoryPie, VictoryTooltip, VictoryTheme } from "victory";
import "../css/grafica.css";

const GraficaPorcentage = () => {
  const [totals, setTotals] = useState({
    totalCompra: 0,
    totalVenta: 0,
    ganaciaEsperada: 0,
    totalVentas: 0,
  });

  const [hoveredSlice, setHoveredSlice] = useState(null);

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
        return fetch(`http://localhost:3000/getSells`);
      })
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
      .then((salesData) => {
        handleSalesData(salesData);
      })
      .catch((err) => {
        console.error("Error al realizar la solicitud:", err);
      });
  }, []);

  const calculateTotals = (data) => {
    let totalCompra = 0;
    let totalVenta = 0;
    let ganaciaEsperada = 0;

    data.forEach((item) => {
      totalCompra += parseFloat(item.precio_de_compra) * item.cantidad;
      totalVenta += parseFloat(item.precio_de_venta) * item.cantidad;
    });

    ganaciaEsperada = totalVenta - totalCompra;

    setTotals((prevTotals) => ({
      ...prevTotals,
      totalCompra,
      totalVenta,
      ganaciaEsperada,
    }));
  };

  const handleSalesData = (salesData) => {
    let totalVentas = 0;

    salesData.forEach((item) => {
      totalVentas += parseFloat(item.total);
    });

    setTotals((prevTotals) => ({
      ...prevTotals,
      totalVentas,
    }));
  };

  const totalSum =
    totals.totalCompra +
    totals.totalVenta +
    totals.ganaciaEsperada +
    totals.totalVentas;

  const dataPredefinida = [
    {
      x: "Para vender",
      y: totals.totalVenta,
      percentage: (totals.totalVenta / totalSum) * 100,
    },
    {
      x: "Comprado",
      y: totals.totalCompra,
      percentage: (totals.totalCompra / totalSum) * 100,
    },
    {
      x: "Ventas totales",
      y: totals.totalVentas,
      percentage: (totals.totalVentas / totalSum) * 100,
    },
    {
      x: "Ganancia esperada",
      y: totals.ganaciaEsperada,
      percentage: (totals.ganaciaEsperada / totalSum) * 100,
    },
  ];

  return (
    <section className="grafica">
      <div className="grafica">
        <h2>Información de caja</h2>
        <VictoryPie
          data={dataPredefinida}
          theme={VictoryTheme.material}
          colorScale={["#FF8C00", "#FF6347", "#00CED1", "#FFD700", "#000080"]}
          radius={({ datum }) => (hoveredSlice === datum.x ? 120 : 100)}
          innerRadius={50}
          labels={({ datum }) => `${datum.x}: ${datum.y}€`}
          labelRadius={110}
          height={300}
          style={{
            data: {
              fillOpacity: 1,
              stroke: "black",
              strokeWidth: 1,
              cursor: "pointer",
            },
            labels: {
              fontSize: 12,
              fill: "black",
            },
          }}
          labelComponent={
            <VictoryTooltip
              flyoutStyle={{
                stroke: "white",
                strokeWidth: 1,
                fill: "white",
                boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
              }}
            />
          }
          events={[
            {
              target: "salesData",
              eventHandlers: {
                onClick: (evt, props, salesData) => {
                  console.log(salesData); // Renderizar información del dato en la consola
                },
              },
            },
          ]}
        />
      </div>
      <div>
        <p>{totals.totalVenta}</p>
      </div>
    </section>
  );
};

export default GraficaPorcentage;
