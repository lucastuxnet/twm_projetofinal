import React, { useState } from "react";
import { Form, Col, Button, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
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

function AddPrestador(props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [celular, setCelular] = useState("");
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [uf, setUf] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [matricula, setMatricula] = useState("");
  const [carteiradetrabalho, setCarteiradeTrabalho] = useState("");
  const [especializacao, setEspecializacao] = useState("");
  const URL = "http://localhost:5000/api/prestadores";

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

  const onChangeUf = (event) => {
    setUf(event.target.value);
  };

  const onChangeMatricula = (event) => {
    setMatricula(event.target.value);
  };

  const onChangeCelular = (event) => {
    setCelular(event.target.value);
  };

  const onChangeCarteiradeTrabalho = (event) => {
    setCarteiradeTrabalho(event.target.value);
  };

  const onChangeEspecializacao = (event) => {
    setEspecializacao(event.target.value);
  };

  const addPrestador = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify ({
        prestadorMatricula: matricula,
        prestadorEspecializacao: especializacao,
        prestadorNome: nome,
        prestadorEmail: email,
        prestadorCelular: celular,
        prestadorCpf: cpf,
        prestadorCarteiradetrabalho: carteiradetrabalho,
        prestadorCep: cep,
        prestadorRua: rua,
        prestadorBairro: bairro,
        prestadorCidade: cidade,
        prestadorUF: uf,
      }),
    };
    fetch("http://localhost:5000/api/prestadores", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <Form style={{ margin: "10px" }}>
      <div style={({ marginTop: "100px" }, { marginLeft: "280px" })}>        
        <h2>Adicionando Prestador:</h2>
          <Row>
            <Col sm={2}>
              <div className="txtMatricula">
                <Form.Label className="text-left" style={{ width: "100%" }}>
                  Matricula
                </Form.Label>
                <Form.Control value={matricula} onChange={onChangeMatricula} />
              </div>
            </Col>
            <Col sm={4}>
            <div className="txtEspecializacao">
              <Form.Label className="text-left" style={{ width: "100%" }}>
                Tecnico em:
              </Form.Label>
              <Form.Control value={especializacao} onChange={onChangeEspecializacao} />
            </div>
          </Col>             
          </Row>
          <Row>
            <Col sm={6}>
              <div className="txtNome">
                <Form.Label className="text-left" style={{ width: "100%" }}>
                  Nome
                </Form.Label>
                <Form.Control value={nome} onChange={onChangeNome} />
              </div>
            </Col>            
          </Row>
          <Row>
            <Col sm={3}>
              <div className="txtEmail">
                <Form.Label className="text-left" style={{ width: "100%" }}>
                  E-mail
                </Form.Label>
                <Form.Control value={email} onChange={onChangeEmail} />
              </div>
            </Col>
            <Col sm={2}>
              <div className="txtCelular">
                <Form.Label className="text-left" style={{ width: "100%" }}>
                  Celular
                </Form.Label>
                <Form.Control value={celular} onChange={onChangeCelular} />
              </div>
            </Col>            
          </Row>
          <Row>
            <Col sm={2}>
              <div className="txtCPF">
                <Form.Label className="text-left" style={{ width: "100%" }}>
                  CPF
                </Form.Label>
                <Form.Control value={cpf} onChange={onChangeCpf} />
              </div>
            </Col>
            <Col sm={3}>
              <div className="txtCarteiradeTrabalho">
                <Form.Label className="text-left" style={{ width: "100%" }}>
                  Número da Carteira de Trabalho
                </Form.Label>
                <Form.Control value={carteiradetrabalho} onChange={onChangeCarteiradeTrabalho} />
              </div>
            </Col>  
          </Row>
          <Row>
            <Col sm={2}>
              <div className="txtCep">
                <Form.Label className="text-left" style={{ width: "100%" }}>
                  CEP
                </Form.Label>
                <Form.Control value={cep} onChange={onChangeCep} />
              </div>
            </Col>
            <Col sm={4}>
              <div className="txtRua">
                <Form.Label className="text-left" style={{ width: "100%" }}>
                  Rua
                </Form.Label>
                <Form.Control value={rua} onChange={onChangeRua} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={2}>
              <div className="txtBairro">
                <Form.Label className="text-left" style={{ width: "100%" }}>
                  Bairro
                </Form.Label>
                <Form.Control value={bairro} onChange={onChangeBairro} />
              </div>
            </Col>
            <Col sm={3}>
              <div className="txtCidade">
                <Form.Label className="text-left" style={{ width: "100%" }}>
                  Cidade
                </Form.Label>
                <Form.Control value={cidade} onChange={onChangeCidade} />
              </div>
            </Col>
            <Col sm={1}>
              <div className="txtCidade">
                <Form.Label className="text-left" style={{ width: "100%" }}>
                  UF
                </Form.Label>
                <Form.Control value={uf} onChange={onChangeUf} />
              </div>
            </Col>
          </Row>
          <br></br>
          <Button variant="primary" onClick={addPrestador}>
            Adicionar Prestador
          </Button>{" "}
      </div>
    </Form>
  );
}

export default AddPrestador;
