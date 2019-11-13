const express = require("express");
const multer = require("multer");
const uploadConfig = require("./config/upload");

const sessionController = require("./controllers/SessionController");
const spotController = require("./controllers/SpotController");

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post("/sessions", sessionController.store);
routes.get("/spots", spotController.index);
routes.post("/spots", upload.single("thumbnail"),spotController.store);

module.exports = routes;
