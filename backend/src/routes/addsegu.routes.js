const addsegurouter = require("express-promise-router")();
const addseguController = require("../controllers/addsegu.controller");

// Definindo as rotas do CRUD

addsegurouter.post("/segurados", addseguController.createSegu);
addsegurouter.put("/segurados", addseguController.updateSegu);
addsegurouter.get("/segurados",addseguController.listAllSegu);
addsegurouter.get("/segurados/:id", addseguController.findSeguById);
addsegurouter.delete("/segurados/:id", addseguController.removeSeguById);

module.exports = addsegurouter;