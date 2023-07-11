const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			version: "1.0.0",
			title: "Swagger api Sofex",
			description:
				"A sample API that uses a api Sofex as an example to demonstrate features in the swagger-2.0 specification",
		},
	},
	apis: [
		"api/routes/index.js",
		"db/models/*.js",
		"api/resoucees/Employee.json",
	],
};
const swaggerSpecs = swaggerJsdoc(options);
const swaggerDocs = (app, port) => {
	app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
	app.get("/docs.json", (req, res) => {
		res.setHeader("Content-Type", "application/json");
		res.send(swaggerSpecs);
	});
	console.log(
		`📓 Version 1 Docs are available at http://localhost:${port}/docs`,
	);
};

module.exports = { swaggerDocs };
