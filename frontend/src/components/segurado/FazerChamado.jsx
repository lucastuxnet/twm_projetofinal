import React, { useState } from "react";
import { Form, Col, Button, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Checkbox from "../utils/Checkbox";
// To make rows collapsible
import "bootstrap/js/src/collapse.js";
import "../css/Segurado.css";
import axios from "axios";
// svelte


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

export default function FazerChamado(props) {

  const [apolice, setNumApolice] = useState("");
  const [plano, setTipodoPlano] = useState("");
  const [data, setData] = useState("");
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [cep, setCep] = useState("");
  const [respsinistro, setRespSinistro] = useState("");
  const [contato, setContatolocal] = useState("");
  const [incendio, setIncendio] = useState(false);
  const [explosao, setExplosao] = useState(false);
  const [quedaraio, setQuedaRaio] = useState(false);
  const [desastre, setDesastre] = useState(false);
  const [nat, setDesastreNatural] = useState(false);
  const [eletrico, setDanoEletrico] = useState(false);
  const [arromba, setArrombamento] = useState(false);
  const [quebra, setQuebra] = useState(false);
  const [roubo, setRoubo] = useState(false);
  const [perda, setPerda] = useState(false);

  async function onChangeCep(e) {
    setCep(cepMask(e.target.value));
    if (String(e.target.value).length === 9) {
      let cepPonto = e.target.value;
      let cepSemPonto = cepPonto.replace("-", "");
      let retorno = await axios.get(
        `https://viacep.com.br/ws/${cepSemPonto}/json`
      );
      setRua(retorno.data.logradouro);
      setCidade(retorno.data.localidade);
      setBairro(retorno.data.bairro);
      setUf(retorno.data.uf);
    }
  }


  const onChangeData = (event) => {
    setData(event.target.value);
  };  

  const onChangeNumApolice = (event) => {
    setNumApolice(event.target.value);
  };

  const onChangeTipodoPlano = (event) => {
    setTipodoPlano(event.target.value);
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

  const onChangeRespSinistro = (event) => {
    setRespSinistro(event.target.value);
  };  

  const onChangeContatolocal = (event) => {
    setContatolocal(event.target.value);
  };

  const onChangeUf = (event) => {
    setUf(event.target.value);
  };

  // Checkbox
  const onChangeIncendio = () => {
    setIncendio(!incendio);
  };
  
  const onChangeExplosao = () => {
    setExplosao(!explosao);
  };
  
  const onChangeQuedaRaio = () => {
    setQuedaRaio(!quedaraio);
  };
  
  const onChangeDesastre = () => {
    setDesastre(!desastre);
  };
  
  const onChangeDesastreNatural = () => {
    setDesastreNatural(!nat);
  };
  
  const onChangeDanoEletrico = () => {
    setDanoEletrico(!eletrico);
  };
  
  const onChangeArrombamento = () => {
    setArrombamento(!arromba);
  };
  
  const onChangeQuebra = () => {
    setQuebra(!quebra);
  };
  
  const onChangeRoubo = () => {
    setRoubo(!roubo);
  };

  const onChangePerda = () => {
    setPerda(!perda);
  };

  const addChamado = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify ({
        seguradoApolice: apolice,
        seguradoTipo: plano,
        seguradoCep: cep,
        seguradoRua: rua,
        seguradoBairro: bairro,
        seguradoCidade: cidade,
        seguradoUf: uf,
        seguradoResp: respsinistro,
        seguradoContato: contato,
        seguradoInc: incendio,
        seguradoExp: explosao,
        seguradoDes: desastre,
        seguradoNat: nat,
        seguradoRob: roubo,
        seguradoDan: eletrico,
        seguradoArr: arromba,
        seguradoQue: quebra,
        seguradoPer: perda,
      }),
    };
    fetch("http://localhost:5000/api/segurado", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };



  return (
    <Form style={{ margin: "10px" }}>
      <div style={({ marginTop: "100px" }, { marginLeft: "280px" })}>        
        <h2>Para melhor lhe atender prencha nosso formulario de chamado:</h2>
        <br />
        <Row>
            <Col sm={2}>
              <div className="txtSegurado">
                <Form.Label className="text-left" style={{ width: "100%" }}>
                  Número da Apólice
                </Form.Label>
                <Form.Control value={apolice} onChange={onChangeNumApolice} />
              </div>
            </Col>
            <Col sm={2}>
              <div className="txtSegurado">
                <Form.Label className="text-left" style={{ width: "100%" }}>
                  Tipo do Plano
                </Form.Label>
                <Form.Control value={plano} onChange={onChangeTipodoPlano} />
              </div>
            </Col>
            <Col sm={2}>
              <div className="txtSegurado">
                <Form.Label className="text-left" style={{ width: "100%" }}>
                  Data
                </Form.Label>
                <Form.Control value={data} onChange={onChangeData} />
              </div>
            </Col>                      
          </Row>
        <Row>
            <Col sm={2}>
                <div className="txtSegurado">
                  <Form.Label className="text-left" style={{ width: "100%" }}>
                    CEP
                  </Form.Label>
                  <Form.Control value={cep} onChange={onChangeCep} />
                </div>
            </Col> 
            <Col sm={4}>
                <div className="txtSegurado">
                  <Form.Label className="text-left" style={{ width: "100%" }}>
                    Endereço
                  </Form.Label>
                  <Form.Control value={rua} onChange={onChangeRua} />
                </div>
            </Col>
        </Row>
        <Row>
            <Col sm={2}>
                <div className="txtSegurado">
                  <Form.Label className="text-left" style={{ width: "100%" }}>
                    Bairro
                  </Form.Label>
                  <Form.Control value={bairro} onChange={onChangeBairro} />
                </div>
            </Col>
            <Col sm={2}>
                <div className="txtSegurado">
                  <Form.Label className="text-left" style={{ width: "100%" }}>
                    Cidade
                  </Form.Label>
                  <Form.Control value={cidade} onChange={onChangeCidade} />
                </div>
            </Col>
            <Col sm={1}>
                <div className="txtSegurado">
                  <Form.Label className="text-left" style={{ width: "100%" }}>
                    UF
                  </Form.Label>
                  <Form.Control value={uf} onChange={onChangeUf} />
                </div>
            </Col>
        </Row>
        <Row>
            <Col sm={4}>
                <div className="txtSegurado">
                  <Form.Label className="text-left" style={{ width: "100%" }}>
                    Responsavel no local
                  </Form.Label>
                  <Form.Control value={respsinistro} onChange={onChangeRespSinistro} />
                </div>
            </Col>
            <Col sm={2}>
                <div className="txtSegurado">
                  <Form.Label className="text-left" style={{ width: "100%" }}>
                    Número de contato
                  </Form.Label>
                  <Form.Control value={contato} onChange={onChangeContatolocal} />
                </div>
            </Col>
          </Row>
        <br />
        <Row>
            Especificações do sinistro:
            <br />
            <Col sm={4}>
            <Checkbox 
              id="checkbox" 
              label="Incêndio." 
              value={incendio} 
              onChange={onChangeIncendio} 
            />
            <Checkbox 
              id="checkbox" 
              label="Explosão." 
              value={explosao} 
              onChange={onChangeExplosao} 
            />
            <Checkbox 
              id="checkbox" 
              label="Queda de Raio." 
              value={quedaraio} 
              onChange={onChangeQuedaRaio} 
            />
            <Checkbox 
              id="checkbox" 
              label="Desastres não Naturais." 
              value={desastre} 
              onChange={onChangeDesastre} 
            />
            <Checkbox
                  id="checkbox"
                  label="Desastres Naturais"
                  value={nat}
                  onChange={onChangeDesastreNatural}
            />
            </Col>
            <Col>
              <Checkbox 
                id="checkbox" 
                label="Roubo ou Furto." 
                value={roubo} 
                onChange={onChangeRoubo} 
              />
              <Checkbox 
                  id="checkbox" 
                  label="Danos elétricos." 
                  value={eletrico} 
                  onChange={onChangeDanoEletrico} 
              />
              <Checkbox 
                  id="checkbox" 
                  label="Arrombamentos." 
                  value={arromba} 
                  onChange={onChangeArrombamento} 
              />
              <Checkbox 
                  id="checkbox" 
                  label="Quebra de vidros, espelhos e pedras." 
                  value={quebra} 
                  onChange={onChangeQuebra} 
              />
              <Checkbox
                  id="checkbox"
                  label="Perda ou Pagamento de Aluguel"
                  value={perda}
                  onChange={onChangePerda}
              />
            </Col>
          </Row>
          <Button variant="primary" onClick={addChamado}>
            Adicionar Chamado
          </Button>{" "}      
        </div>
    </Form>        
  );
}

