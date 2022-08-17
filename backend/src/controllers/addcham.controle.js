/**
 * CRUD da tabela de clientes
 */
// docker run -d --name some-postgres -e POSTGRES_PASSWORD=banco -e PGDATA=/var/lib/postgresql/data/pgdata -v /home/marciocunha/postgresData:/var/lib/postgresql/data postgres:11

const db = require("../config/database");

exports.createCham = async (req, res) => {
  const {
    seguradoApolice,
    seguradoTipo,
    seguradoCep,
    seguradoRua,
    seguradoBairro,
    seguradoCidade,
    seguradoUf,
    seguradoResp,
    seguradoContato,
    seguradoInc,
    seguradoExp,
    seguradoDes,
    seguradoNat,
    seguradoRob,
    seguradoDan,
    seguradoArr,
    seguradoQue,
    seguradoPer,
  } = req.body;

  console.log(req.body);
  console.log(seguradoApolice);
  const response = await db.query(
    "INSERT INTO chamados (apolice, plano, cep, rua, bairro, cidade, uf, respsinistro, contato, incendio, explosao, desastre, nat, roubo, eletrico, arromba, quebra, perda) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)",
    [
        seguradoApolice,
        seguradoTipo,
        seguradoCep,
        seguradoRua,
        seguradoBairro,
        seguradoCidade,
        seguradoUf,
        seguradoResp,
        seguradoContato,
        seguradoInc,
        seguradoExp,
        seguradoDes,
        seguradoNat,
        seguradoRob,
        seguradoDan,
        seguradoArr,
        seguradoQue,
        seguradoPer,
    ]
  );

  res.status(201).send({
    message: "Chamado inserido com sucesso",
    body: {
      chamado: {
        seguradoApolice,
        seguradoTipo,
        seguradoCep,
        seguradoRua,
        seguradoBairro,
        seguradoCidade,
        seguradoUf,
        seguradoResp,
        seguradoContato,
        seguradoInc,
        seguradoExp,
        seguradoDes,
        seguradoNat,
        seguradoRob,
        seguradoDan,
        seguradoArr,
        seguradoQue,
        seguradoPer,
      },
    },
  });
};

exports.listAllCham = async (req, res) => {
  console.log("Lista all");
  const response = await db.query("SELECT * FROM chamados ORDER BY id");
  res.status(200).send(response.rows);
};

exports.findChamById = async (req, res) => {
  const chamadoID = parseInt(req.params.id);
  const response = await db.query("SELECT * FROM chamados WHERE id = $1", [
    chamadoID,
  ]);
  res.status(200).send(response.rows);
};

exports.updateCham = async (req, res) => {
  const chamadoID = parseInt(req.body.chamadoID);
  const {
    seguradoApolice,
    seguradoTipo,
    seguradoCep,
    seguradoRua,
    seguradoBairro,
    seguradoCidade,
    seguradoUf,
    seguradoResp,
    seguradoContato,
    seguradoInc,
    seguradoExp,
    seguradoDes,
    seguradoNat,
    seguradoRob,
    seguradoDan,
    seguradoArr,
    seguradoQue,
    seguradoPer,
  } = req.body;

  //clienteID = parseInt(clienteID);
  console.log(req.body);
  console.log(seguradoApolice);
  const response = await db.query(
    "UPDATE chamado SET apolice = $2, plano = $3, cep = $4, rua = $5, bairro = $6, cidade = $7, uf = $8, respsinistro = $9, contato = $10, incendio = $11, explosao = $12, desastre = $13, nat = $14, roubo = $15, eletrico = $16, arromba = $17, quebra = $18, perda = $19 WHERE id = $1",
    [
        chamadoID,
        seguradoApolice,
        seguradoTipo,
        seguradoCep,
        seguradoRua,
        seguradoBairro,
        seguradoCidade,
        seguradoUf,
        seguradoResp,
        seguradoContato,
        seguradoInc,
        seguradoExp,
        seguradoDes,
        seguradoNat,
        seguradoRob,
        seguradoDan,
        seguradoArr,
        seguradoQue,
        seguradoPer,
    ]
  );

  console.log(response);
  if (response.rowCount > 0) {
    res.status(201).send({
      message: "Chamado alterado com sucesso!",
      body: {
        chamado: {
            chamadoID,
            seguradoApolice,
            seguradoTipo,
            seguradoCep,
            seguradoRua,
            seguradoBairro,
            seguradoCidade,
            seguradoUf,
            seguradoResp,
            seguradoContato,
            seguradoInc,
            seguradoExp,
            seguradoDes,
            seguradoNat,
            seguradoRob,
            seguradoDan,
            seguradoArr,
            seguradoQue,
            seguradoPer,
        },
      },
    });
  } else {
    res.status(201).send({
      message: "Chamado não alterado",
      body: {
        chamado: {
            chamadoID,
            seguradoApolice,
            seguradoTipo,
            seguradoCep,
            seguradoRua,
            seguradoBairro,
            seguradoCidade,
            seguradoUf,
            seguradoResp,
            seguradoContato,
            seguradoInc,
            seguradoExp,
            seguradoDes,
            seguradoNat,
            seguradoRob,
            seguradoDan,
            seguradoArr,
            seguradoQue,
            seguradoPer,
        },
      },
    });
  }
};

exports.removeChamById = async (req, res) => {
  const chamadoID = parseInt(req.params.id);
  console.log(chamadoID);

  const response = await db.query("DELETE FROM chamado WHERE id = $1", [
    chamadoID,
  ]);

  console.log(response);
  if (response.rowCount > 0) {
    res.status(201).send({
      message: "Chamado removido com sucesso!",
      body: {
        chamado: { chamadoID },
      },
    });
  } else {
    res.status(201).send({
      message: "Segurado não removido",
      body: {
        chamado: { chamadoID },
      },
    });
  }
};
