
const { User } = require('../db').conn.models;
const { Op } = require('sequelize');

const checkUserExists = async (req, res, next) => {
	const { username, email } = req.body;
	const user = await User.findOne({
		where: { [Op.or]: [{ username }, { email }] }
	});
	if (user) return res.status(400).json({ error: "Username or Email already exists" });
	next();
};

const checkMinimalPasswordLength = (req, res, next) => {
	const MIN_LENGTH = 8;
	const { password } = req.body;

	if (!password) {
		return res.status(400).json({ error: "Password is required." });
	}

	if (password.length < MIN_LENGTH) {
		return res.status(400).json({
			error: `Password must be at least ${MIN_LENGTH} characters long.`
		});
	}

	next();
};

module.exports = {
	checkUserExists,
	checkMinimalPasswordLength
};
