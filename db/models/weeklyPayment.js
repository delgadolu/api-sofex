const { Model } = require("objection");

/**
 * @swagger
 * components:
 *   schemas:
 *     WeeklyPayment:
 *       type: object
 *       required:
 *         - employee_id
 *       properties:
 *         id:
 *           type: integer
 *           description: Indice auto generado
 *         employee_id:
 *           type: string
 *           description: Id para identificar los empleados
 *         salary_initial:
 *           type: number
 *           description: Nombre del empleado
 *         date_in:
 *           type: date
 *           description: Nombre del empleado
 *         date_out:
 *           type: date
 *           description: Nombre del empleado
 *         hour:
 *           type: number
 *           description: Apellido del empleado
 *         hour_extra:
 *           type: number
 *           description: cargos desempeñador el empleador
 *         hour_total:
 *           type: number
 *           description: Estatus del empleado
 *         extra_money:
 *           type: number
 *           description: Estatus del empleado
 *         final_payment:
 *           type: number
 *           description: Estatus del empleado
 *       example:
 *         salary_initial: "2000.10"
 *         date_in: "2023-06-24T04:00:00.000Z"
 *         date_out: "2023-06-24T04:00:00.000Z"
 *         hour: 8
 *         hour_extra: 1
 *         hour_total: 9
 *         final_payment: "5000.00"
 *         employee_id: "nuWl5431(@^]"
 */
class WeeklyPayment extends Model {
	// Table name is the only required property.
	static get tableName() {
		return "weekly_payment";
	}

	// Optional JSON schema.
	static get jsonSchema() {
		return {
			type: "object",
			required: ["employee_id"],

			properties: {
				id: { type: "integer" },
				employee_id: { type: "string" },
				salary_initial: { type: "number" },
				hour: { type: "number" },
				hour_extra: { type: "number" },
				hour_total: { type: "number" },
				extra_money: { type: "number" },
				final_payment: { type: "number" },
			},
		};
	}

	// This object defines the relations to other models.
	static get relationMappings() {
		const WeeklyRecord = require("./weeklyRecord");
		const Employee = require("./employee");
		return {
			weeklyRecord: {
				relation: Model.HasManyRelation,
				modelClass: WeeklyRecord,
				join: {
					from: "weekly_payment.id",
					to: "weekly_record.payement_id",
				},
			},
			employee: {
				relation: Model.BelongsToOneRelation,
				modelClass: Employee,
				join: {
					from: "weekly_payment.employee_id",
					to: "employee.id_employee",
				},
			},
		};
	}
}

module.exports = WeeklyPayment;
