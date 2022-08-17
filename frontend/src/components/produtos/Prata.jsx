import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Col, Button, Row } from "react-bootstrap";
// To make rows collapsible
import "bootstrap/js/src/collapse.js";
import "../css/Produtos.css";
import Cards from "../utils/Cards.jsx";
// svelte
const Prata = (props) => {
  return (
      <Cards titulo=" Plano Prata cobertura até R$600 mil">
        <Row>
        <Col sm={3}>
          <div>
             <b>Incêncio.</b>
             <br/>
                Se o seu lar for
                atingido por fogo
                ou fumaça, seja por
                um acidente na sua
                casa ou na de vizinhos,
                você conta com uma
                indenização para repor
                o que foi danificado.
          </div>
        </Col>
        <Col sm={3}>
          <div>
             <b>Explosão.</b>
             <br/>   
              Se o seu lar for atingido
              por explosão, seja por um
              acidente na sua casa ou na
              de vizinhos, você conta com
              uma indenização para repor 
              o que foi danificado.
          </div>
        </Col>
        <Col sm={3}>
          <div>
             <b>Queda de Raio.</b>
             <br/>
             Se o seu lar for atingido
             por um raio, queda de qualquer
             raio direto na estrutura da sua
             residência ou no terreno, 
             você conta com uma indenização
             para repor o que foi danificado.
          </div>
          <br />
        </Col>
        <Col sm={3}>
          <div>
             <b>Desastres não Naturais.</b>
             <br/>
             Se o seu lar sofrer algum dano
             acidentalmente causando um dano
             tipo estrutural a sua residência
             o seguro cobre as despesas
             correspondentes.
          </div>
        </Col>
        <Col sm={3}>
          <div>
             <b>Desastres Naturais.</b>
             <br/>   
             Se o seu lar sofrer algum dano
             causado pela naturezado tipo
             estrutural a sua residência 
             o seguro cobre as despesas
             correspondentes.
          </div>
          <br />
        </Col>
        <Col sm={3}>
          <div>
             <b>Roubo ou Furto.</b>
             <br/>
             Em caso de roubo ou furto,
             essa cobertura ampara os
             itens da sua casa que forem
             perdidos ou danificados.

          </div>
        </Col>
        < Col sm={3}>
          <div>
            <b>Danos elétricos.</b>
            <br />
            A reposição de aparelhos eletrônicos
            e eletrodomésticos que queimarem
            por queda de raio ou oscilação de
            energia é garantida por essa
            cobertura.
          </div>
        </Col>
        < Col sm={3}>
          <div>
            <b>Arrombamentos.</b>
            <br />
            Em caso de arrombamentos, essa
            cobertura ampara os itens da
            sua casa que forem perdidos
            ou danificados.
          </div>
        </Col>
        < Col sm={3}>
          <div>
            <b>Quebra de vidros, espelhos e pedras.</b>
            <br />
            Se os vidros do seu box,
            ou janelas, espelhos, vidros
            da varanda e até cooktop
            quebrarem, essa cobertura
            garante a reposição desses
            itens. Vale até para louças
            sanitárias.
          </div>
        </Col>
        < Col sm={3}>
          <div>
            <b>Perda ou Pagamento de Aluguel.</b>
            <br />
            Em caso de perda do emprego
            ou não possuir o valor
            monetário do aluguel, essa
            cobertura ampara o valores 
            a quitar por três meses.
          </div>
        </Col>
        </Row>
      </Cards>
  );
};
export default Prata;
