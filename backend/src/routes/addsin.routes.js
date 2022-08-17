/**
 * rotas da parte da interação da api com a tabela de clientes
 */
 const addsinirouter = require("express-promise-router")();
 const siniController = require("../controllers/addsin.controller");
 
 // Definindo as rotas do CRUD
 
 addsinirouter.post("/prestador", siniController.createSini);
 addsinirouter.put("/prestador", siniController.updateSini);
 addsinirouter.get("/prestador", siniController.listAllSini);
 addsinirouter.get("/prestador/:id", siniController.findSiniById);
 addsinirouter.delete("/prestador/:id", siniController.removeSiniById);
 
 module.exports = addsinirouter;
 