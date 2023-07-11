const { Model } = require("objection");

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - id_employee
 *         - name
 *         - last_name
 *         - charge
 *       properties:
 *         id:
 *           type: integer
 *           description: Indice auto generado
 *         id_employee:
 *           type: string
 *           description: Id para identificar los empleados
 *         name:
 *           type: string
 *           description: Nombre del empleado
 *         last_name:
 *           type: string
 *           description: Apellido del empleado
 *         charge:
 *           type: string
 *           description: cargos desempeñador el empleador
 *         status:
 *           type: enum
 *           description: Estatus del empleado
 *       example:
 *         id_employee: nuWl5431(@^]
 *         name: Alexander
 *         last_name: Wilches
 *         charge: Desarrollador
 *     EmployeeByID:
 *       type: object
 *       required:
 *         - id
 *       example:
 *         id_employee: "nuWl5431(@^]"
 *         name: "test name"
 *         last_name: "test lastname"
 *         charge: "dev"
 *         status: "1"
 *         weeklyRecord:
 *         - id: "1"
 *           check_in: "11.00"
 *           check_out:
 *           star_date: "2023-06-24T04:00:00.000Z"
 *           employee_id: "nuWl5431(@^]"
 *           payment_id: "1"
 *     IdEmployee:
 *       type: object
 *       required:
 *         - id_employee
 *       properties:
 *         id_employee:
 *           type: string
 *           description: Id para identificar los empleados
 *       example:
 *         id_employee: nuWl5431(@^]
 */
class Employee extends Model {
	// Table name is the only required property.
	static get tableName() {
		return "employee";
	}

	// Optional JSON schema.
	static get jsonSchema() {
		return {
			type: "object",
			required: ["id_employee", "name", "last_name", "charge"],

			properties: {
				id: { type: "integer" },
				id_employee: { type: "string" },
				name: { type: "string", minLength: 1, maxLength: 25 },
				last_name: { type: "string", minLength: 1, maxLength: 255 },
				charge: { type: "string", minLength: 1, maxLength: 255 },
				status: { type: "integer" },
			},
		};
	}

	// This object defines the relations to other models.
	static get relationMappings() {
		const WeeklyRecord = require("./weeklyRecord");
		const WeeklyPayment = require("./weeklyPayment");
		return {
			weeklyRecord: {
				relation: Model.HasManyRelation,
				modelClass: WeeklyRecord,
				join: {
					from: "employee.id_employee",
					to: "weekly_record.employee_id",
				},
			},
			weeklyPayment: {
				relation: Model.HasManyRelation,
				modelClass: WeeklyPayment,
				join: {
					from: "employee.id_employee",
					to: "weekly_payment.employee_id",
				},
			},
		};
	}
}

module.exports = Employee;
