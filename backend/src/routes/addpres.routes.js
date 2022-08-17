 const addpresrouter = require("express-promise-router")();
 const addpresController = require("../controllers/addpres.controller");
 
 // Definindo as rotas do CRUD
 
 addpresrouter.post("/prestadores", addpresController.createPres);
 addpresrouter.put("/prestadores", addpresController.updatePres);
 addpresrouter.get("/prestadores", addpresController.listAllPres);
 addpresrouter.get("/prestadores/:id", addpresController.findPresById);
 addpresrouter.delete("/prestadores/:id", addpresController.removePresById);
 
 module.exports = addpresrouter;