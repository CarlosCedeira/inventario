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
  const [activo, setActivo] = useState(false);
  const [elemento, setElemento] = useState({
    nombre: "",
    cantidadPorcentaje: "",
    beneficio: "",
    beneficioPorcentaje: "",
  });

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

  const nombres = datos.map((item) => item.nombre);
  const cantidades = datos.map((item) => item.cantidad);
  const productosTotales = datos.reduce(
    (acumulador, dato) => acumulador + dato.cantidad,
    0
  );
  const beneficioEsperado = datos.reduce(
    (acumulador, dato) =>
      acumulador + parseFloat(dato.precio_de_venta) * parseFloat(dato.cantidad),
    0
  );
  const dineroInvertido = datos.reduce(
    (acumulador, dato) =>
      acumulador +
      parseFloat(dato.precio_de_compra) * parseFloat(dato.cantidad),
    0
  );
  const beneficio = dineroInvertido - beneficioEsperado;
  const maxValue = Math.max(...cantidades);
  const customTickValues = [
    0,
    Math.round(0.25 * maxValue),
    Math.round(0.5 * maxValue),
    Math.round(0.75 * maxValue),
    Math.round(maxValue),
  ];
  const colors = ["#FF8C00", "#FF6347", "#009EA1", "#FFD700"];

  return datos ? (
    <section className="datos">
      <div className="grafica">
        <h2>Productos totales {productosTotales}</h2>
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
                stroke: "#000", // Color del borde
                strokeWidth: 1, // Ancho del borde
                cursor: "pointer",
              },
            }}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onClick: (evt, props) => {
                    datos.map((item) => {
                      if (item.nombre === props.datum.xName) {
                        // props.datum.xName nombre del elemento que recibe el click
                        setElemento({
                          nombre: item.nombre,
                          cantidadPorcentaje: (
                            (item.cantidad * 100) /
                            productosTotales
                          ).toFixed(2),
                          beneficio: (
                            item.precio_de_venta * item.cantidad -
                            item.precio_de_compra * item.cantidad
                          ).toFixed(2),
                          beneficioPorcentaje:
                            ((item.precio_de_compra * item.cantidad -
                              item.precio_de_venta * item.cantidad) *
                              100) /
                            beneficio,
                        });
                        setActivo(true);
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
      {activo ? (
        <div className="datos">
          <button
            onClick={() => setActivo(false)}
            className="cerrar"
            title="cerrar"
          >
            ❌
          </button>
          <h2>{elemento.nombre}</h2>
          <p>Porcentaje sobre el total: {elemento.cantidadPorcentaje}%</p>
          <p>Beneficio: {elemento.beneficio}€</p>
          <p>Porcentaje de beneficio: {elemento.beneficioPorcentaje}%</p>
        </div>
      ) : null}
    </section>
  ) : (
    <p>Cargando...</p>
  );
};

export default ProdutosTotales;
