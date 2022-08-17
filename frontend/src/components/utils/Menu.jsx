import React from "react";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Root from "./Root.jsx";
// Seguradora
import AddSegurados from "../seguradora/AddSegurado.jsx";
import AddPrestador from "../seguradora/AddPrestador.jsx";
import ControledeSinistros from "../seguradora/ControledeSinistros.jsx";
import MeusSegurados from "../seguradora/MeusSegurados.jsx";
import MeusPrestadores from "../seguradora/MeusPrestadores.jsx";
// Prestadores
import DadosPrestador from "../prestador/DadosPrestador.jsx";
import VisualizarSinistros from "../prestador/VisualizarSinistros.jsx";
import AddSinistro from "../prestador/AddSinistro.jsx";
// Segurado
import DadosSegurado from "../segurado/DadosSegurado.jsx";
import FazerChamado from "../segurado/FazerChamado.jsx";
import ChamadosSolicitados from "../segurado/ChamadosSolicitados.jsx";
// Produtos
import Plano1 from "../produtos/Ouro.jsx";
import Plano2 from "../produtos/Prata.jsx";
import Plano3 from "../produtos/Bronze.jsx";

function Menu() {
  const history = useNavigate();


  return (
    <>
      <SideNav
        onSelect={(selected) => {
          history(selected);
        }}
      >
        {/* fa fa-fw fa-address-book */}
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="home">
          <NavItem eventKey="home">
            <NavIcon>
              <i
                className="fa fa-fw fa-address-book"
                style={{ fontSize: "1.75em" }}
              />
            </NavIcon>
              <NavText>Area Seguradora</NavText>
            <NavItem eventKey="/segurado">
              <NavText>Adicionar Segurado</NavText>
            </NavItem>
            <NavItem eventKey="/prestador">
              <NavText>Adicionar Prestador</NavText>
            </NavItem>            
            <NavItem eventKey="/controledesinistros">
              <NavText>Controle de Sinistros</NavText>
            </NavItem>
            <NavItem eventKey="/meussegurados">
              <NavText>Meus Segurados</NavText>
            </NavItem>
            <NavItem eventKey="/meusprestadores">
              <NavText>Meus Prestadores</NavText>
            </NavItem>
          </NavItem>
          <NavItem eventKey="areaprestador">
            <NavIcon>
              <i
                className="fa fa-fw fa-line-chart"
                style={{ fontSize: "1.75em" }}
              />
            </NavIcon>
            <NavText>Area Prestador</NavText>
            <NavItem eventKey="dadosprestador">
              <NavText>Dados</NavText>
            </NavItem>
            <NavItem eventKey="visualizarsinistros">
              <NavText>Ver Sinistros</NavText>
            </NavItem>
            <NavItem eventKey="adicionarsinistro">
              <NavText>Cadastrar Sinistros</NavText>
            </NavItem>
          </NavItem>
          <NavItem eventKey="areasegurado">
            <NavIcon>
              <i
                className="fa fa-fw fa-line-chart"
                style={{ fontSize: "1.75em" }}
              />
            </NavIcon>
            <NavText>Area Segurado</NavText>
            <NavItem eventKey="dadossegurado">
              <NavText>Dados</NavText>
            </NavItem>
            <NavItem eventKey="fazerchamado">
              <NavText>Fazer Chamado</NavText>
            </NavItem>
            <NavItem eventKey="chamadossolicitados">
              <NavText>Visualizar Chamados</NavText>
            </NavItem>
          </NavItem>
          <NavItem eventKey="areasegurado">
            <NavIcon>
              <i
                className="fa fa-fw fa-line-chart"
                style={{ fontSize: "1.75em" }}
              />
            </NavIcon>
            <NavText>Nossos Produtos</NavText>
            <NavItem eventKey="ouro">
              <NavText>Plano de Seguro Ouro</NavText>
            </NavItem>
            <NavItem eventKey="prata">
              <NavText>Plano de Seguro Prata</NavText>
            </NavItem>
            <NavItem eventKey="bronze">
              <NavText>Plano de Seguro Bronze</NavText>
            </NavItem>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/segurado" element={<AddSegurados />} />
        <Route path="/prestador" element={<AddPrestador />} />
        <Route path="/dadosprestador" element={<DadosPrestador />} />
        <Route path="/visualizarsinistros" element={<VisualizarSinistros />} />
        <Route path="/adicionarsinistro" element={<AddSinistro />} />
        <Route path="/dadossegurado" element={<DadosSegurado />} />
        <Route path="/fazerchamado" element={<FazerChamado />} />
        <Route path="/chamadossolicitados" element={<ChamadosSolicitados />} />
        <Route path="/controledesinistros" element={<ControledeSinistros />} />
        <Route path="/meussegurados" element={<MeusSegurados />} />
        <Route path="/meusprestadores" element={<MeusPrestadores />} />
        <Route path="/Ouro" element={<Plano1 />} />
        <Route path="/Prata" element={<Plano2 />} />
        <Route path="/Bronze" element={<Plano3 />} />
      </Routes>
    </>
  );
}

export default Menu;
