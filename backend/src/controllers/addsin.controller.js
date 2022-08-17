/**
 * CRUD da tabela de clientes
 */
// docker run -d --name some-postgres -e POSTGRES_PASSWORD=banco -e PGDATA=/var/lib/postgresql/data/pgdata -v /home/marciocunha/postgresData:/var/lib/postgresql/data postgres:11

const db = require("../config/database");

exports.createSini = async (req, res) => {
  const {
     siniMat,
     siniApol,
     siniPlano,
     siniCheg,
     siniSai,
     siniRua,
     siniBair,
     siniCid,
     siniUf,
     siniCep,
     siniResp,
     siniCont,
     siniInc,
     siniExp,
     siniRaio,
     siniDes,
     siniNat,
     siniRoub,
     siniDano,
     siniArrom,
     siniQue,
     siniPer,
  } = req.body;

  console.log(req.body);
  console.log(siniMat);
  const response = await db.query(
    "INSERT INTO sinistros (matricula, apolice, plano, chegada, saida, rua, bairro, cidade, cep, uf, respsinistro, contato, incendio, explosao, quedaraio, desastre, nat, roubo, eletrico, arromba, quebra, perda) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)",
    [
        siniMat,
        siniApol,
        siniPlano,
        siniCheg,
        siniSai,
        siniRua,
        siniBair,
        siniCid,
        siniUf,
        siniCep,
        siniResp,
        siniCont,
        siniInc,
        siniExp,
        siniRaio,
        siniDes,
        siniNat,
        siniRoub,
        siniDano,
        siniArrom,
        siniQue,
        siniPer,
    ]
  );

  res.status(201).send({
    message: "Sinistro inserido com sucesso",
    body: {
      sini: {
        siniMat,
        siniApol,
        siniPlano,
        siniCheg,
        siniSai,
        siniRua,
        siniBair,
        siniCid,
        siniUf,
        siniCep,
        siniResp,
        siniCont,
        siniInc,
        siniExp,
        siniRaio,
        siniDes,
        siniNat,
        siniRoub,
        siniDano,
        siniArrom,
        siniQue,
        siniPer,
      },
    },
  });
};

exports.listAllSini = async (req, res) => {
  console.log("Lista all");
  const response = await db.query("SELECT * FROM sinistros ORDER BY id");
  res.status(200).send(response.rows);
};

exports.findSiniById = async (req, res) => {
  const siniID = parseInt(req.params.id);
  const response = await db.query("SELECT * FROM sinistros WHERE id = $1", [
    siniID,
  ]);
  res.status(200).send(response.rows);
};

exports.updateSini = async (req, res) => {
  const siniID = parseInt(req.body.siniID);
  const {
     siniMat,
     siniApol,
     siniPlano,
     siniCheg,
     siniSai,
     siniRua,
     siniBair,
     siniCid,
     siniUf,
     siniCep,
     siniResp,
     siniCont,
     siniInc,
     siniExp,
     siniRaio,
     siniDes,
     siniNat,
     siniRoub,
     siniDano,
     siniArrom,
     siniQue,
     siniPer,
  } = req.body;

  //clienteID = parseInt(clienteID);
  console.log(req.body);
  console.log(siniMat);
  const response = await db.query(
    "UPDATE sinistros SET matricula = $2, apolice = $3, plano = $4, chegada = $5, saida = $6, rua = $7, bairro = $8, cidade = $9, cep = $10, uf = $11, respsinistro = $12, contato = $13, incendio = $14, explosao = $15, quedaraio = $16, desastre = $17, nat = $18, roubo = $19, eletrico = $20, arromba = $21, quebra = $22, perda = $23 WHERE id = $1",
    [
      siniID,
      siniMat,
      siniApol,
      siniPlano,
      siniCheg,
      siniSai,
      siniRua,
      siniBair,
      siniCid,
      siniUf,
      siniCep,
      siniResp,
      siniCont,
      siniInc,
      siniExp,
      siniRaio,
      siniDes,
      siniNat,
      siniRoub,
      siniDano,
      siniArrom,
      siniQue,
      siniPer,
    ]
  );

  console.log(response);
  if (response.rowCount > 0) {
    res.status(201).send({
      message: "Sinistro alterado com sucesso!",
      body: {
        sini: {
            siniID,
            siniMat,
            siniApol,
            siniPlano,
            siniCheg,
            siniSai,
            siniRua,
            siniBair,
            siniCid,
            siniUf,
            siniCep,
            siniResp,
            siniCont,
            siniInc,
            siniExp,
            siniRaio,
            siniDes,
            siniNat,
            siniRoub,
            siniDano,
            siniArrom,
            siniQue,
            siniPer,
        },
      },
    });
  } else {
    res.status(201).send({
      message: "Sinistro não alterado",
      body: {
        sini: {
            siniID,
            siniMat,
            siniApol,
            siniPlano,
            siniCheg,
            siniSai,
            siniRua,
            siniBair,
            siniCid,
            siniUf,
            siniCep,
            siniResp,
            siniCont,
            siniInc,
            siniExp,
            siniRaio,
            siniDes,
            siniNat,
            siniRoub,
            siniDano,
            siniArrom,
            siniQue,
            siniPer,
        },
      },
    });
  }
};

exports.removeSiniById = async (req, res) => {
  const siniID = parseInt(req.params.id);
  console.log(siniID);

  const response = await db.query("DELETE FROM sinistros WHERE id = $1", [
    siniID,
  ]);

  console.log(response);
  if (response.rowCount > 0) {
    res.status(201).send({
      message: "Sinistro removido com sucesso!",
      body: {
        sini: { siniID },
      },
    });
  } else {
    res.status(201).send({
      message: "Sinistro não removido",
      body: {
        sini: { siniID },
      },
    });
  }
};
