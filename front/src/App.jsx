import { useState } from "react";
import RenderComponent from "./components/getComponent";
import GraficasController from "./components/graficasController";
import "./css/app.css";

function App() {
  const [formData, setFormData] = useState({
    inventario: true,
    movimientos: false,
    datos: false,
    clientes: false,
    sells: false,
  });

  const handleInputChange = (field) => {
    setFormData({
      inventario: field === "inventario",
      movimientos: field === "movimientos",
      datos: field === "datos",
      clientes: field === "clientes",
      sells: field === "sells",
    });
  };

  return (
    <>
      <header>
        <nav className="menu">
          <ol>
            <li>
              <input
                type="button"
                className={formData.inventario ? "hidden" : ""}
                value={formData.inventario ? "" : "inventario"}
                onClick={() => handleInputChange("inventario")}
              />
            </li>
            <li>
              <input
                type="button"
                className={formData.movimientos ? "hidden" : ""}
                value={formData.movimientos ? "" : "movimientos"}
                onClick={() => handleInputChange("movimientos")}
              />
            </li>
            <li>
              <input
                type="button"
                className={formData.datos ? "hidden" : ""}
                value={formData.datos ? "" : "datos"}
                onClick={() => handleInputChange("datos")}
              />
            </li>
            <li>
              <input
                type="button"
                className={formData.clientes ? "hidden" : ""}
                value={formData.clientes ? "" : "clientes"}
                onClick={() => handleInputChange("clientes")}
              />
            </li>
            <li>
              <input
                type="button"
                className={formData.sells ? "hidden" : ""}
                value={formData.sells ? "" : "sells"}
                onClick={() => handleInputChange("sells")}
              />
            </li>
          </ol>
        </nav>
      </header>
      <main>
        {formData.inventario && (
          <RenderComponent key="getProducts" ruta="getProducts" />
        )}
        {formData.movimientos && (
          <RenderComponent key="getMovements" ruta="getMovements" />
        )}
        {formData.datos && <GraficasController />}
        {formData.clientes && (
          <RenderComponent key="getClients" ruta="getClients" />
        )}
        {formData.sells && <RenderComponent key="getSells" ruta="getSells" />}
      </main>
    </>
  );
}

export default App;
