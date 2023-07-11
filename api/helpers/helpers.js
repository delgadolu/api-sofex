const getRandomString = (length = 4) => {
	let result = "";
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

const getRandomSimbols = (length = 4) => {
	let result = "";
	const characters = "^!$%&|[](){}:;.,*+-#@<>~€¬";
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

const getRandomNumber = (digits = 4) => {
	return Math.random().toString().slice(-digits);
};

const generateRandomid = () => {
	const number = getRandomNumber();
	const simbols = getRandomSimbols();
	const letters = getRandomString();
	return letters.concat(number, simbols);
};
const validateID = (id) => {
	console.log(id);
	const patt = new RegExp(
		"^(?=[A-Za-z]+[0-9]+[\^!$%&|\\[\\](){}:;.,\\*+\\-#@<>~€¬\\/])[A-Za-z0-9\^!$%&|\\[\\](){}:;.,\\*+\\-#@<>~€¬\\/]{12}$",
		"g",
	);
	const result = patt.test(id);
	return result;
};

const validateString = (letters) => {
	const patt = new RegExp("^[A-Za-z ]+$", "g");
	const result = patt.test(letters);
	return result;
};

const validateNumber = (number) => {
	const patt = new RegExp("/^d*.d+$/", "g");
	const result = patt.test(number);
	return result;
};

module.exports = {
	getRandomString,
	getRandomSimbols,
	getRandomNumber,
	generateRandomid,
	validateID,
	validateString,
	validateNumber,
};
