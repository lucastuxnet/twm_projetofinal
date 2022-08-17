const addchamrouter = require("express-promise-router")();
const addchamController = require("../controllers/addcham.controle");

// Definindo as rotas do CRUD

addchamrouter.post("/segurado", addchamController.createCham);
addchamrouter.put("/segurado", addchamController.updateCham);
addchamrouter.get("/segurado", addchamController.listAllCham);
addchamrouter.get("/segurado/:id", addchamController.findChamById);
addchamrouter.delete("/segurado/:id", addchamController.removeChamById);

module.exports = addchamrouter;