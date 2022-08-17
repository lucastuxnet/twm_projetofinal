/*
Arquivo de configuração da aplicação
*/

const express = require("express");
const cors = require("cors");

const app = express();

const index = require("./routes/index");
const addpresRoute = require("./routes/addpres.routes");
const addseguRoute = require("./routes/addsegu.routes");
const addsiniRoute = require("./routes/addsin.routes");



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: "application/vnd.api+json" }));
app.use(cors());

app.use(index);

app.use("/api/", addpresRoute);
app.use("/api/", addseguRoute);
app.use("/api/", addsiniRoute);



module.exports = app;
