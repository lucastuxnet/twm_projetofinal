/**
 * CRUD da tabela de clientes
 */
// docker run -d --name some-postgres -e POSTGRES_PASSWORD=banco -e PGDATA=/var/lib/postgresql/data/pgdata -v /home/marciocunha/postgresData:/var/lib/postgresql/data postgres:11

const db = require("../config/database");

exports.createPres = async (req, res) => {
  const {
    prestadorMatricula,
    prestadorEspecializacao,
    prestadorNome,
    prestadorEmail,
    prestadorCelular,
    prestadorCpf,
    prestadorCarteiradetrabalho,
    prestadorCep,
    prestadorRua,
    prestadorBairro,
    prestadorCidade,
    prestadorUF,
  } = req.body;

  console.log(req.body);
  console.log(prestadorMatricula);
  const response = await db.query(
    "INSERT INTO prestadores (matricula, especializacao, nome, email, celular, cpf, carteiradetrabalho, cep, rua, cidade, bairro, uf) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
    [
        prestadorMatricula,
        prestadorEspecializacao,
        prestadorNome,
        prestadorEmail,
        prestadorCelular,
        prestadorCpf,
        prestadorCarteiradetrabalho,
        prestadorCep,
        prestadorRua,
        prestadorBairro,
        prestadorCidade,
        prestadorUF,
    ]
  );

  res.status(201).send({
    message: "Prestador inserido com sucesso",
    body: {
      prestador: {
        prestadorMatricula,
        prestadorEspecializacao,
        prestadorNome,
        prestadorEmail,
        prestadorCelular,
        prestadorCpf,
        prestadorCarteiradetrabalho,
        prestadorCep,
        prestadorRua,
        prestadorBairro,
        prestadorCidade,
        prestadorUF,
      },
    },
  });
};

exports.listAllPres = async (req, res) => {
  console.log("Lista all");
  const response = await db.query("SELECT * FROM prestadores ORDER BY id");
  res.status(200).send(response.rows);
};

exports.findPresById = async (req, res) => {
  const prestadorID = parseInt(req.params.id);
  const response = await db.query("SELECT * FROM prestores WHERE id = $1", [
    prestadorID,
  ]);
  res.status(200).send(response.rows);
};

exports.updatePres = async (req, res) => {
  const prestadorID = parseInt(req.body.prestadorID);
  const {
    prestadorMatricula,
    prestadorEspecializacao,
    prestadorNome,
    prestadorEmail,
    prestadorCelular,
    prestadorCpf,
    prestadorCarteiradetrabalho,
    prestadorCep,
    prestadorRua,
    prestadorBairro,
    prestadorCidade,
    prestadorUF,
  } = req.body;

  //clienteID = parseInt(clienteID);
  console.log(req.body);
  console.log(prestadorMatricula);
  const response = await db.query(
    "UPDATE prestadores SET matricula = $2, especializacao = $3, nome = $4, email = $5, celular = $6, cpf = $7, carteiradetrabalho = $8, cep = $9, rua = $10, bairro = $11, cidade = $12, uf = $13 WHERE id = $1",
    [
      prestadorID,
      prestadorMatricula,
      prestadorEspecializacao,
      prestadorNome,
      prestadorEmail,
      prestadorCelular,
      prestadorCpf,
      prestadorCarteiradetrabalho,
      prestadorCep,
      prestadorRua,
      prestadorBairro,
      prestadorCidade,
      prestadorUF,
    ]
  );

  console.log(response);
  if (response.rowCount > 0) {
    res.status(201).send({
      message: "Prestador alterado com sucesso!",
      body: {
        prestador: {
            prestadorID,
            prestadorMatricula,
            prestadorEspecializacao,
            prestadorNome,
            prestadorEmail,
            prestadorCelular,
            prestadorCpf,
            prestadorCarteiradetrabalho,
            prestadorCep,
            prestadorRua,
            prestadorBairro,
            prestadorCidade,
            prestadorUF,
        },
      },
    });
  } else {
    res.status(201).send({
      message: "Prestador não alterado",
      body: {
        prestador: {
          prestadorID,
          prestadorMatricula,
          prestadorEspecializacao,
          prestadorNome,
          prestadorEmail,
          prestadorCelular,
          prestadorCpf,
          prestadorCarteiradetrabalho,
          prestadorCep,
          prestadorRua,
          prestadorBairro,
          prestadorCidade,
          prestadorUF,
        },
      },
    });
  }
};

exports.removePresById = async (req, res) => {
  const prestadorID = parseInt(req.params.id);
  console.log(prestadorID);

  const response = await db.query("DELETE FROM prestador WHERE id = $1", [
    prestadorID,
  ]);

  console.log(response);
  if (response.rowCount > 0) {
    res.status(201).send({
      message: "Prestador removido com sucesso!",
      body: {
        prestador: { prestadorID },
      },
    });
  } else {
    res.status(201).send({
      message: "Prestador não removido",
      body: {
        prestador: { prestadorID },
      },
    });
  }
};
