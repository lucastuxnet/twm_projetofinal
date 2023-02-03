import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <header>
      <div>
        <Link to="/" className="logo">
          <Button style={{ color: "#FFFF" }}>TWM SEGUROS</Button>
        </Link>
        <nav>
          <ul>
            <li>
              <Link to="/">
                <Button style={{ color: "#FFFF" }}>INICIO</Button>
              </Link>
            </li>
            <li>
              <Button style={{ color: "#FFFF" }} onClick={handleClick}>
                Area Prestador
              </Button>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <Link to="/prestador/dados">
                  <MenuItem onClick={handleClose}>Dados</MenuItem>
                </Link>
                <Link to="/prestador/chamadoseg">
                  <MenuItem onClick={handleClose}>Visualizar Chamados</MenuItem>
                </Link>
                <Link to="/prestador/cadastro">
                  <MenuItem onClick={handleClose}>Cadastrar Sinistros</MenuItem>
                </Link>
                <Link to="/prestador/chamados">
                  <MenuItem onClick={handleClose}>Ver Chamados</MenuItem>
                </Link>
              </Menu>
            </li>
            <li>
              <Button style={{ color: "#FFFF" }} onClick={handleClick2}>
                Area Segurado
              </Button>
              <Menu anchorEl={anchorEl2} open={open2} onClose={handleClose2}>
                <Link to="/segurado/dados">
                  <MenuItem onClick={handleClose2}>Dados</MenuItem>
                </Link>
                <Link to="/segurado/cadastro">
                  <MenuItem onClick={handleClose2}>Fazer Chamados</MenuItem>
                </Link>
                <Link to="/segurado/chamados">
                  <MenuItem onClick={handleClose2}>Ver Chamados</MenuItem>
                </Link>
              </Menu>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
