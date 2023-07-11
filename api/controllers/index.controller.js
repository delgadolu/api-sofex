const Employee = require("../../db/models/employee");
const WeeklyPayment = require("../../db/models/weeklyPayment");
const WeeklyRecord = require("../../db/models/weeklyRecord");
const {
	generateRandomid,
	validateID,
	validateString,
	validateNumber,
} = require("../helpers/helpers");

const util = require("util");

const now = new Date();

const getEmployeeByID = async (req, res) => {
	try {
		const { id } = req.params;
		console.log(Number(id));
		if (Number.isInteger(Number(id))) {
			const employee = await Employee.query()
				.findById(id)
				.withGraphFetched("weeklyRecord");
			res.json(employee);
		}
		res.status(400).json({ data: "Error en la informacion ingresada" });
	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
};

const insertEmployee = async (req, res) => {
	try {
		const params = req.body;
		const idEmployee = generateRandomid();
		console.log({ ...params, idEmployee });
		const employee = await Employee.query().insert({
			...params,
			id_employee: idEmployee,
		});
		const weeklyPayment = await WeeklyPayment.query().insert({
			date_in: now,
			date_out: now,
			employee_id: idEmployee,
		});
		const weeklyRecord = await WeeklyRecord.query().insert({
			star_date: now,
			employee_id: idEmployee,
			payment_id: weeklyPayment.id,
		});

		res.json(employee);
	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
};

const updateEmployee = async (req, res) => {
	try {
		const { id_employee, name, last_name, charge, status } = req.body;
		if (
			validateID(id_employee) &&
			validateString(name) &&
			validateNumber(status) &&
			validateString(name)
		) {
			const employee = await Employee.query()
				.findOne(id_employee)
				.patch({ name, last_name, charge, status });
			res.json(employee);
		} else {
			res.status(400).json({ data: "Error en la informacion ingresada" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
};

const updateWeeklyPayment = async (req, res) => {
	try {
		const {
			employee_id,
			salary_initial,
			hour,
			hourExtra,
			hourTotal,
			extraMoney,
			finalPayment,
		} = req.body;
		const weeklyPayment = await WeeklyPayment.query()
			.patch({
				salary_initial,
				hour,
				hourExtra,
				hourTotal,
				extraMoney,
				finalPayment,
			})
			.where("employee_id", "=", employee_id);
		res.json({ message: "Información actualizada" });
	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
};

const deleteEmployee = async (req, res) => {
	try {
		const id_employee = req.query.id_employee;

		if (validateID(id_employee)) {
			const employee = await Employee.query()
				.findOne(id_employee)
				.patch({ status: 2 });
			res.json({ message: "Eliminado Correctamente" });
		} else {
			res.status(400).json({ data: "Error en la informacion ingresada" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
};

const checkIn = async (req, res) => {
	try {
		const id_employee = req.query.id_employee;
		console.log(id_employee);
		if (validateID(id_employee)) {
			const logIn = await WeeklyRecord.query()
				.findOne({
					employee_id: id_employee,
				})
				.patch({ star_date: now, check_in: Number(now.getHours()) });
			const logInPayment = await WeeklyPayment.query()
				.findOne({
					employee_id: id_employee,
				})
				.patch({ date_in: now });
			res.send({ status: "OK", data: "registro Actualizado" });
		} else {
			res.status(400).json({ data: "Error en la informacion ingresada" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
};

const checkOut = async (req, res) => {
	try {
		const { id_employee, extraMoney } = req.body;

		const logIn = await WeeklyRecord.query()
			.findOne({
				employee_id: id_employee,
			})
			.patch({ check_out: now.getHours() });

		const dataWeeklyRecord = await WeeklyRecord.query()
			.innerJoin(
				"employee",
				"employee.id_employee",
				"weekly_record.employee_id",
			)
			.findOne({
				employee_id: id_employee,
				status: 1,
			});

		const dataPayment = await WeeklyPayment.query().findOne({
			employee_id: id_employee,
		});

		const hourinitial = dataPayment.hour == null ? 0 : Number(dataPayment.hour);
		const hour = now.getHours() - dataWeeklyRecord.check_in + hourinitial;

		const hourExtra = hour > 8 ? hour - 8 + dataPayment.hourExtra : 0;

		const registerPayment = await WeeklyPayment.query()
			.findOne({
				employee_id: id_employee,
			})
			.patch({
				date_out: now,
				extra_money: Number(extraMoney),
				hour_extra: Number(hourExtra),
				hour_total: Number(hour + hourExtra),
				hour: Number(hour),
			});

		res.json(logIn);
	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
};

const starWeek = async (req, res) => {
	try {
		const id_employee = req.query.id_employee;
		if (validateID(id_employee)) {
			const logIn = await WeeklyRecord.query()
				.findOne({
					employee_id: id_employee,
				})
				.patch({ star_date: now, check_in: 0, check_out: 0 });

			const logInPayment = await WeeklyPayment.query()
				.findOne({
					employee_id: id_employee,
				})
				.patch({ date_in: now, date_out: now });
			res.json(logIn);
		}
		res.status(400).json({ data: "Error en la informacion ingresada" });
	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
};

const getReportPayment = async (req, res) => {
	try {
		const id_employee = req.query.id_employee;
		if (validateID(id_employee)) {
			if (id_employee) {
				const weeklyPayment = await WeeklyPayment.query().findOne({
					employee_id: id_employee,
				});
				res.send({ status: "OK", data: weeklyPayment });
			} else {
				const weeklyPayment = await WeeklyPayment.query();
				res.send({ status: "OK", data: weeklyPayment });
			}
		} else {
			res.status(400).json({ data: "Error en la informacion ingresada" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
};

module.exports = {
	getEmployeeByID,
	insertEmployee,
	updateEmployee,
	updateWeeklyPayment,
	deleteEmployee,
	checkIn,
	checkOut,
	starWeek,
	getReportPayment,
};
