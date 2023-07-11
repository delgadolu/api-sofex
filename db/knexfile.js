// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const { dev } = require("objection");
module.exports = {
	development: {
		client: "postgresql",
		connection: {
			database: "db_sofex",
			user: "postgres",
			password: "123456",
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: "knex_migrations",
		},
		seeds: {
			directory: "./seeds",
		},
		...dev,
	},
};
