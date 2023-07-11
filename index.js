const dbSetUp = require("./db/db-setup");
const express = require("express");
const { swaggerDocs } = require("./api/swagger");
require("dotenv").config();
dbSetUp();

const app = express();

//middlewares
app.use(express.json());

//routes
app.use(require("./api/routes/index"));
const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log(`server on port ${port}`);
	swaggerDocs(app, port);
});
