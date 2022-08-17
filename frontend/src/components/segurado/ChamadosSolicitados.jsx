import React, { useState } from "react";
import { Form, Col, Button, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
const axios = require("axios");



const ChamadoSolicitados = (props) => {

  const [data, setData] = useState({'jsonData': []});

  const listarChamados = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("http://localhost:5000/api/segurado", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
      <Form style={{ margin: "10px" }}>
        <div style={({ marginTop: "100px" }, { marginLeft: "280px" })}>        
        <h2>Listando Chamados:</h2>
            <Row>
              <Col sm={10}>
                <tbody>
                    {data.jsonData.map((value) => {
                      return(
                    <tr>
                      <td>{value.chamID}</td>
                    </tr>
                      )
                  })}
                </tbody>            
              </Col> 
            </Row>
            <br/>
            <Button variant="primary" onClick={listarChamados}>
                Listar
            </Button>{" "}
            <br/>
            <br/>
            <br/>
            <br/>

        </div>
      </Form>
  );
};
export default ChamadoSolicitados;
