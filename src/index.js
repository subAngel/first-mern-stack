const express = require("express");
const morgan = require("morgan");
const path = require("path");
const debug = require("debug")("app:index");
const taskRoutes = require("./routes/task.routes");
const { mongoose } = require("./database/database.config");

const app = express();

// * settings
app.set("port", process.env.PORT || 3000);

// * middlewares
app.use(morgan("dev"));
app.use(express.json());
// * routes
app.use("/api/tasks", taskRoutes);

// * static files
app.use(express.static(path.join(__dirname, "public")));

// * starting server
app.listen(app.get("port"), () => {
	debug(`Server listening on http://localhost:${app.get("port")}`);
});
