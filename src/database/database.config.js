const mongoose = require("mongoose");
const debug = require("debug")("app:database-config");

const URI = "mongodb://localhost/mern-tasks";

mongoose
	.connect(URI)
	.then((db) => debug("database is connected"))
	.catch((err) => debug(err));

module.exports = mongoose;
