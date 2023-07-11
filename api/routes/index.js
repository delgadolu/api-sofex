const { Router } = require("express");
const router = Router();

const {
	getEmployeeByID,
	insertEmployee,
	updateEmployee,
	updateWeeklyPayment,
	deleteEmployee,
	checkIn,
	checkOut,
	starWeek,
	getReportPayment,
} = require("../controllers/index.controller");

/**
 * @swagger
 * tags:
 *   name: Employee
 *   description: The Employee managing API
 * /employee/{id}:
 *   get:
 *     summary: getEmployeeByID
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *         type: integer
 *         description: ID del Empleado
 *     responses:
 *       200:
 *         description: The created Employee.
 *         content:
 *           application/json:
 *             schema:
 *               $ref:  '#/components/schemas/EmployeeByID'
 *       500:
 *         description: Some server error
 */
router.get("/employee/:id", getEmployeeByID);

/**
 * @swagger
 * tags:
 *   name: Employee
 *   description: The Employee managing API
 * /employee:
 *   post:
 *     summary: Create a new Employee
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: The created Employee.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       500:
 *         description: Some server error
 *
 */
router.post("/employee", insertEmployee);

/**
 * @swagger
 * tags:
 *   name: Employee
 *   description: The Employee managing API
 * /employee:
 *   put:
 *     summary: Create a new Employee
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: The created Employee.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       500:
 *         description: Some server error
 *
 */
router.put("/employee", updateEmployee);

/**
 * @swagger
 * tags:
 *   name: Employee
 *   description: The Employee managing API
 * /employee:
 *   patch:
 *     summary: Create a new Employee
 *     tags: [Employee]
 *     parameters:
 *       - in: query
 *         name: id_employee
 *         schema:
 *           type: string
 *         description: identificador de Empleado
 *     responses:
 *       200:
 *         description: The delete Employee.
 *       500:
 *         description: Some server error
 *
 */
router.delete("/employee/:id_employee", deleteEmployee);

/**
 * @swagger
 * tags:
 *   name: Employee
 *   description: The Employee managing API
 * /weekly_payment:
 *   put:
 *     summary: Create a new Employee
 *     tags: [WeeklyPayment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WeeklyPayment'
 *     responses:
 *       200:
 *         description: The created Employee.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WeeklyPayment'
 *       500:
 *         description: Some server error
 *
 */
router.patch("/weekly_payment", updateWeeklyPayment);

/**
 * @swagger
 * tags:
 *   name: Employee
 *   description: The Employee managing API
 * /check_in:
 *   get:
 *     summary: Create a new Employee
 *     tags: [Employee]
 *     parameters:
 *       - in: query
 *         name: id_employee
 *         schema:
 *           type: string
 *         description: identificador de Empleado
 *     responses:
 *       200:
 *         description: Inicio de Semana.
 *       500:
 *         description: Some server error
 *
 */
router.get("/check_in/:id_employee?", checkIn);

/**
 * @swagger
 * tags:
 *   name: Employee
 *   description: The Employee managing API
 * /check_out:
 *   patch:
 *     summary: Create a new Employee
 *     tags: [Employee]
 *     responses:
 *       200:
 *         description: Finalizar Semana.
 *       500:
 *         description: Some server error
 *
 */
router.patch("/check_out/", checkOut);

/**
 * @swagger
 * tags:
 *   name: Employee
 *   description: The Employee managing API
 * /star_week:
 *   patch:
 *     summary: Create a new Employee
 *     tags: [Employee]
 *     parameters:
 *       - in: query
 *         name: id_employee
 *         schema:
 *           type: string
 *         description: identificador de Empleado
 *     responses:
 *       200:
 *         description: Reset de Semana.
 *       500:
 *         description: Some server error
 *
 */
router.patch("/star_week/:id_employee", starWeek);

/**
 * @swagger
 * tags:
 *   name: Employee
 *   description: The Employee managing API
 * /report_payment:
 *   get:
 *     summary: Create a new Employee
 *     tags: [Employee]
 *     parameters:
 *       - in: query
 *         name: id_employee
 *         schema:
 *           type: string
 *         description: identificador de Empleado
 *     responses:
 *       200:
 *         description: reporte del pago.
 *       500:
 *         description: Some server error
 *
 */
router.get("/report_payment/:id_employee?", getReportPayment);

module.exports = router;
