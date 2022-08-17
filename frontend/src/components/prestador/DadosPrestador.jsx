import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// To make rows collapsible
import "bootstrap/js/src/collapse.js";
import "../css/Prestador.css";
// svelte
const DadosPrestador = (props) => {
  return (
    <div>
        <div
          className="ContainerPrestador"
          style={({ marginTop: "10px" }, { marginLeft: "270px" })}
        >
          <h2>Meus dados</h2>
        </div>
    </div>
  );
};
export default DadosPrestador;
