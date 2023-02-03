import dayjs from "dayjs";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { ResponseSinistros, Sinistro } from "../../../helper/interfaces";
import api from "../../../services/api";
import { CircularProgress } from "@mui/material";

export default function ProviderPreview() {
  const [data, setData] = useState<Sinistro[]>([]);
  const [isLoading, setLoading] = useState(true);

  function fetch() {
    api
      .get<ResponseSinistros>("/sinistro")
      .then((res) => {
        const { data } = res;

        const sinistros = data.sinistros.map((sinistro) => sinistro);
        setData(sinistros);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    void fetch();
  }, []);

  return (
    <div className="container-form">
      <h1>Chamados</h1>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Matricula</TableCell>
              <TableCell align="right">Apolice</TableCell>
              <TableCell align="right">Plano</TableCell>
              <TableCell align="right">Horário Inicial</TableCell>
              <TableCell align="right">Horário final</TableCell>
              <TableCell align="right">Endereço</TableCell>
              <TableCell align="right">Bairro</TableCell>
              <TableCell align="right">Cidade</TableCell>
              <TableCell align="right">CEP</TableCell>
              <TableCell align="right">Responsvel no Local</TableCell>
              <TableCell align="right">Numbero Contato</TableCell>
              <TableCell align="right">Sinistros</TableCell>
            </TableRow>
          </TableHead>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.matricula}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.matricula}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.apolice}
                  </TableCell>
                  <TableCell align="right">{row.planType}</TableCell>
                  <TableCell align="right">
                    {dayjs(row.initHour).format("HH:mm:ss")}
                  </TableCell>
                  <TableCell align="right">
                    {dayjs(row.endHour).format("HH:mm:ss")}
                  </TableCell>
                  <TableCell align="right">{row.address}</TableCell>
                  <TableCell align="right">{row.district}</TableCell>
                  <TableCell align="right">{row.city}</TableCell>
                  <TableCell align="right">{row.cep}</TableCell>
                  <TableCell align="right">{row.resp_locale}</TableCell>
                  <TableCell align="right">{row.phone_contact}</TableCell>
                  <TableCell align="right">
                    {row.sinistrosTypes
                      .map((sinistro) => sinistro.name)
                      .join(", ")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </div>
  );
}
