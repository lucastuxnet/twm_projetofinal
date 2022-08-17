import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// To make rows collapsible
import "bootstrap/js/src/collapse.js";
import "../css/Segurado.css";
// svelte
const DadosSegurado = (props) => {
  return (
    <div>
        <div
          className="ContainerSegurado"
          style={({ marginTop: "10px" }, { marginLeft: "270px" })}
        >
          <h2>Meus Dados</h2>
        </div>
    </div>
  );
};
export default DadosSegurado;
