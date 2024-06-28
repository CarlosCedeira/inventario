import { useEffect } from "react";
import "../css/animacionCarga.css"; // Asegúrate de tener un archivo CSS donde colocar los estilos

function AnimacionCarga() {
  return (
    <div className="animacionCarga">
      <div id="loading">
        <div id="loading-spinner"></div>
        <div id="loading-text">Cargando...</div>
      </div>
    </div>
  );
}

export default AnimacionCarga;
