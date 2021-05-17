const routes = require("express").Router();
const restoController = require("../controllers/resto.controller");

routes.get("/resto", restoController.listResto, restoController.detailResto);

module.exports = routes;
