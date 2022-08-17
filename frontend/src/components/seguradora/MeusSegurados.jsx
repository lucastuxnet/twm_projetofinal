import React, { useState } from "react";
import { Form, Col, Button, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Seguradora.css";
const axios = require("axios");

export const cpfMask = (value) => {
  console.log("Dentro do CPF");
  return value
    .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{3})(\d)/, "$1.$2") // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1"); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
};

export const cepMask = (value) => {
  return value
    .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{5})(\d)/, "$1-$2") // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(-\d{3})\d+?$/, "$1"); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
};

function MeusSegurados(props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [celular, setCelular] = useState("");
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [uf, setUf] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [numapolice, setNumApolice] = useState("");
  const [tipodoplano, setTipodoPlano] = useState("");
  const [inicioplano, setInicioPlano] = useState("");
  const [fimplano, setFimPlano] = useState("");
  const [modeloimovel, setModeloImovel] = useState("");
  const [tamanhoimovel, setTamanhoImovel] = useState("");
  const [externo, setMonitoramentoExterno] = useState("");
  const [datanasc, setDataNascimento] = useState("");
  const [data, setData] = useState({'jsonData': []});
  const URL = "http://localhost:5000/api/segurados";

  
  const onChangeNome = (event) => {
    setNome(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  async function onChangeCep(e) {
    setCep(cepMask(e.target.value));
    if (String(e.target.value).length == 9) {
      let cepPonto = e.target.value;
      let cepSemPonto = cepPonto.replace("-", "");
      let retorno = await axios.get(
        `https://viacep.com.br/ws/${cepSemPonto}/json`
      );
      console.log(retorno.data.logradouro);
      console.log(retorno);
      setRua(retorno.data.logradouro);
      setCidade(retorno.data.localidade);
      setBairro(retorno.data.bairro);
      setUf(retorno.data.uf);
    }
  }

  const onChangeCpf = (event) => {
    setCpf(cpfMask(event.target.value));
  };

  const onChangeRua = (event) => {
    setRua(event.target.value);
  };

  const onChangeBairro = (event) => {
    setBairro(event.target.value);
  };

  const onChangeCidade = (event) => {
    setCidade(event.target.value);
  };

  const onChangeNumApolice = (event) => {
    setNumApolice(event.target.value);
  };

  const onChangeCelular = (event) => {
    setCelular(event.target.value);
  };

  const onChangeUf = (event) => {
    setUf(event.target.value);
  };

  const onChangeTipodoPlano = (event) => {
    setTipodoPlano(event.target.value);
  };

  const onChangeInicioPlano = (event) => {
    setInicioPlano(event.target.value);
  };

  const onChangeFimPlano = (event) => {
    setFimPlano(event.target.value);
  };

  const onChangeModeloImovel = (event) => {
    setModeloImovel(event.target.value);
  };

  const onChangeTamanhoImovel = (event) => {
    setTamanhoImovel(event.target.value);
  };

  const onChangeMonitoramentoExterno = (event) => {
    setMonitoramentoExterno(event.target.value);
  };

  const onChangeDataNascimento = (event) => {
    setDataNascimento(event.target.value);
  };

  const listarSegurado = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("http://localhost:5000/api/segurados", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const alterarSegurado = () => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify ({
        seguradoID: 6,
        seguradoApolice: numapolice,
        seguradoTipo: tipodoplano,
        seguradoInicio: inicioplano,
        seguradoFim: fimplano,
        seguradoModelo: modeloimovel,
        seguradoTamanho: tamanhoimovel,
        seguradoMExterno: externo,
        seguradoNome: nome,
        seguradoCpf: cpf,
        seguradoData: datanasc,
        seguradoEmail: email,
        seguradoCelular: celular,
        seguradoCep: cep,
        seguradoRua: rua,
        seguradoBairro: bairro,
        seguradoCidade: cidade,
        seguradoUf: uf,

      }),
    };
    fetch("http://localhost:5000/api/segurados", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const deletarSegurado = () => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify ({
        seguradoID: 6,
      }),
    };
    fetch("http://localhost:5000/api/segurados", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };



  return (
    <Form style={{ margin: "10px" }}>
      <div style={({ marginTop: "100px" }, { marginLeft: "280px" })}>        
        <h2>Listando Segurados:</h2>
          <Row>
            <Col sm={10}>
              <tbody>
                  {data.jsonData.map((value) => {
                    return(
                  <tr>
                    <td>{value.id}</td>
                    <td>{value.numapolice}</td>
                    <td>{value.nome}</td>
                  </tr>
                    )
                })}
              </tbody>            
            </Col> 
          </Row>
          <br/>
          <Button variant="primary" onClick={listarSegurado}>
              Listar Segurados
          </Button>{" "}
          <br/>
          <br/>
          <br/>
          <br/>
        <h3>Editando Segurados:</h3>
          <Row>
            <Col sm={2}>
              <div className="txtSeguradora">
                <Form.Label className="text-left" style={{ width: "100%" }}>
                  Número da Apólice
                </Form.Label>
                <Form.Control value={numapolice} onChange={onChangeNumApolice} />
              </div>
            </Col>
            <Col sm={2}>
              <div className="txtSeguradora">
                <Form.Label className="text-left" style={{ width: "100%" }}>
                  Tipo do Plano
                </Form.Label>
                <Form.Control value={tipodoplano} onChange={onChangeTipodoPlano} />
              </div>
            </Col>
            <Col sm={2}>
              <div className="txtSeguradora">
                <Form.Label className="text-left" style={{ width: "100%" }}>
                  Inicio da Vigência
                </Form.Label>
                <Form.Control value={inicioplano} onChange={onChangeInicioPlano} />
              </div>
            </Col>
            <Col sm={2}>
              <div className="txtSeguradora">
                <Form.Label className="text-left" style={{ width: "100%" }}>
                  Valido até
                </Form.Label>
                <Form.Control value={fimplano} onChange={onChangeFimPlano} />
              </div>
            </Col>            
          </Row>          
          <Row>
          <Col sm={2}>
              <div className="txtSeguradora">
                <Form.Label className="text-left" style={{ width: "100%" }}>
                  Modelo do Imovel
                </Form.Label>
                <Form.Control value={modeloimovel} onChange={onChangeModeloImovel} />
              </div>
            </Col>
            <Col sm={2}>
              <div className="txtSeguradora">
                <Form.Label className="text-left" style={{ width: "100%" }}>
                  Medidas do imovel
                </Form.Label>
                <Form.Control value={tamanhoimovel} onChange={onChangeTamanhoImovel} />
              </div>
            </Col>
            <Col sm={4}>
              <div className="txtSeguradora">
                <Form.Label className="text-left" style={{ width: "100%" }}>
                  Monitoramente Externo
                </Form.Label>
                <Form.Control value={externo} onChange={onChangeMonitoramentoExterno} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={4}>
              <div className="txtSeguradora">
                <Form.Label className="text-left" style={{ width: "100%" }}>
                  Nome
                </Form.Label>
                <Form.Control value={nome} onChange={onChangeNome} />
              </div>
            </Col>
            <Col sm={2}>
              <div className="txtSeguradora">
                <Form.Label className="text-left" style={{ width: "100%" }}>
                  CPF
                </Form.Label>
                <Form.Control value={cpf} onChange={onChangeCpf} />
              </div>
            </Col>         
          </Row>
          <Row>
            <Col sm={2}>
              <div className="txtSeguradora">
                <Form.Label className="text-left" style={{ width: "100%" }}>
                  Data de Nascimento
                </Form.Label>
                <Form.Control value={datanasc} onChange={onChangeDataNascimento} />
              </div>
            </Col> 
            <Col sm={3}>
              <div className="txtSeguradora">
                <Form.Label className="text-left" style={{ width: "100%" }}>
                  E-mail
                </Form.Label>
                <Form.Control value={email} onChange={onChangeEmail} />
              </div>
            </Col>
            <Col sm={2}>
              <div className="txtSeguradora">
                <Form.Label className="text-left" style={{ width: "100%" }}>
                  Celular
                </Form.Label>
                <Form.Control value={celular} onChange={onChangeCelular} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={2}>
              <div className="txtSeguradora">
                <Form.Label className="text-left" style={{ width: "100%" }}>
                  CEP
                </Form.Label>
                <Form.Control value={cep} onChange={onChangeCep} />
              </div>
            </Col>
            <Col sm={6}>
              <div className="txtSeguradora">
                <Form.Label className="text-left" style={{ width: "100%" }}>
                  Rua
                </Form.Label>
                <Form.Control value={rua} onChange={onChangeRua} />
              </div>
            </Col>
          </Row>
          <Row>            
            <Col sm={2}>
              <div className="txtSeguradora">
                <Form.Label className="text-left" style={{ width: "100%" }}>
                  Bairro
                </Form.Label>
                <Form.Control value={bairro} onChange={onChangeBairro} />
              </div>
            </Col>
            <Col sm={4}>
              <div className="txtSeguradora">
                <Form.Label className="text-left" style={{ width: "100%" }}>
                  Cidade
                </Form.Label>
                <Form.Control value={cidade} onChange={onChangeCidade} />
              </div>
            </Col>
            <Col sm={1}>
              <div className="txtSeguradora">
                <Form.Label className="text-left" style={{ width: "100%" }}>
                  UF
                </Form.Label>
                <Form.Control value={uf} onChange={onChangeUf} />
              </div>
            </Col>
          </Row>
          <br />
          <Button variant="primary" onClick={alterarSegurado}>
              Editar Segurado
          </Button>{" "}
          <Button variant="primary" onClick={deletarSegurado}>
              Remover Segurado
          </Button>{" "}
      </div>
    </Form>
  );
}

export default MeusSegurados;

