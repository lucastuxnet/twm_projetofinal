/**
 * CRUD da tabela de clientes
 */
// docker run -d --name some-postgres -e POSTGRES_PASSWORD=banco -e PGDATA=/var/lib/postgresql/data/pgdata -v /home/marciocunha/postgresData:/var/lib/postgresql/data postgres:11

const db = require("../config/database");

exports.createSegu = async (req, res) => {
  const {
    seguradoApolice,
    seguradoTipo,
    seguradoInicio,
    seguradoFim,
    seguradoModelo,
    seguradoTamanho,
    seguradoMExterno,
    seguradoNome,
    seguradoCpf,
    seguradoData,
    seguradoEmail,
    seguradoCelular,
    seguradoCep,
    seguradoRua,
    seguradoBairro,
    seguradoCidade,
    seguradoUf,
  } = req.body;

  console.log(req.body);
  console.log(seguradoApolice);
  const response = await db.query(
    "INSERT INTO segurados (numapolice, tipodoplano, inicioplano, fimplano, modeloimovel, tamanhoimovel, externo, nome, cpf, datanasc, email, celular, cep, rua, cidade, bairro, uf) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)",
    [
        seguradoApolice,
        seguradoTipo,
        seguradoInicio,
        seguradoFim,
        seguradoModelo,
        seguradoTamanho,
        seguradoMExterno,
        seguradoNome,
        seguradoCpf,
        seguradoData,
        seguradoEmail,
        seguradoCelular,
        seguradoCep,
        seguradoRua,
        seguradoBairro,
        seguradoCidade,
        seguradoUf,
    ]
  );

  res.status(201).send({
    message: "Segurado inserido com sucesso",
    body: {
      segurado: {
        seguradoApolice,
        seguradoTipo,
        seguradoInicio,
        seguradoFim,
        seguradoModelo,
        seguradoTamanho,
        seguradoMExterno,
        seguradoNome,
        seguradoCpf,
        seguradoData,
        seguradoEmail,
        seguradoCelular,
        seguradoCep,
        seguradoRua,
        seguradoBairro,
        seguradoCidade,
        seguradoUf,
      },
    },
  });
};

exports.listAllSegu = async (req, res) => {
  console.log("Lista all");
  const response = await db.query("SELECT * FROM segurados ORDER BY id");
  res.status(200).send(response.rows);
};

exports.findSeguById = async (req, res) => {
  const seguradoID = parseInt(req.params.id);
  const response = await db.query("SELECT * FROM segurados WHERE id = $1", [
    seguradoID,
  ]);
  res.status(200).send(response.rows);
};

exports.updateSegu = async (req, res) => {
  const seguradoID = parseInt(req.body.seguradoID);
  const {
    seguradoApolice,
    seguradoTipo,
    seguradoInicio,
    seguradoFim,
    seguradoModelo,
    seguradoTamanho,
    seguradoMExterno,
    seguradoNome,
    seguradoCpf,
    seguradoData,
    seguradoEmail,
    seguradoCelular,
    seguradoCep,
    seguradoRua,
    seguradoBairro,
    seguradoCidade,
    seguradoUf,
  } = req.body;

  //clienteID = parseInt(clienteID);
  console.log(req.body);
  console.log(seguradoApolice);
  const response = await db.query(
    "UPDATE segurado SET numapolice = $2, tipodoplano = $3, inicioplano = $4, fimplano = $5, modeloimovel = $6, tamanhoimovel = $7, externo = $8, nome = $9, cpf = $10, datanasc = $11, email = $12, celular = $13, cep = $14, rua = $15, cidade = $16, bairro = $17, uf = $18 WHERE id = $1",
    [
        seguradoID,
        seguradoApolice,
        seguradoTipo,
        seguradoInicio,
        seguradoFim,
        seguradoModelo,
        seguradoTamanho,
        seguradoMExterno,
        seguradoNome,
        seguradoCpf,
        seguradoData,
        seguradoEmail,
        seguradoCelular,
        seguradoCep,
        seguradoRua,
        seguradoBairro,
        seguradoCidade,
        seguradoUf,
    ]
  );

  console.log(response);
  if (response.rowCount > 0) {
    res.status(201).send({
      message: "Segurado alterado com sucesso!",
      body: {
        segurado: {
            seguradoID,
            seguradoApolice,
            seguradoTipo,
            seguradoInicio,
            seguradoFim,
            seguradoModelo,
            seguradoTamanho,
            seguradoMExterno,
            seguradoNome,
            seguradoCpf,
            seguradoData,
            seguradoEmail,
            seguradoCelular,
            seguradoCep,
            seguradoRua,
            seguradoBairro,
            seguradoCidade,
            seguradoUf,
        },
      },
    });
  } else {
    res.status(201).send({
      message: "Segurado não alterado",
      body: {
        segurado: {
            seguradoID,
            seguradoApolice,
            seguradoTipo,
            seguradoInicio,
            seguradoFim,
            seguradoModelo,
            seguradoTamanho,
            seguradoMExterno,
            seguradoNome,
            seguradoCpf,
            seguradoData,
            seguradoEmail,
            seguradoCelular,
            seguradoCep,
            seguradoRua,
            seguradoBairro,
            seguradoCidade,
            seguradoUf,
        },
      },
    });
  }
};

exports.removeSeguById = async (req, res) => {
  const seguradoID = parseInt(req.params.id);
  console.log(seguradoID);

  const response = await db.query("DELETE FROM segurado WHERE id = $1", [
    seguradoID,
  ]);

  console.log(response);
  if (response.rowCount > 0) {
    res.status(201).send({
      message: "Segurado removido com sucesso!",
      body: {
        segurado: { seguradoID },
      },
    });
  } else {
    res.status(201).send({
      message: "Segurado não removido",
      body: {
        segurado: { seguradoID },
      },
    });
  }
};
