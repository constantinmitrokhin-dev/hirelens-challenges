
const bcrypt = require('bcryptjs');
const{ User } = require("../db").conn.models;
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const { getUserTodoLists } = require("./todoList-controller.js");

const convertPswdToHash = async (password) => {
	return await bcrypt.hash(password, 10);
}

const verifyPassword = async (password, password_hash) => {
	return await bcrypt.compare(password, password_hash);
}

const findUserByUsername = async (username) => {
	return await User.findOne({
		where: {
			username: username
		}
	})
}

const createJWToken = (user_id, username) => {
	return jwt.sign(
		{ id: user_id, username: username },
		JWT_SECRET,
		{ expiresIn: '1h' }
	)
}

const createNewUser = async (req, res) => {
	try {
		const {username, password, name, lastname, email} = req.body;
		const password_hash = await convertPswdToHash(password);
		const newUser = await User.create({
			username,
			password_hash,
			name,
			lastname,
			email
		});
		const todoList = [];
		return res.status(201).json({
			message: "User created successfully!",
			todoList,
			user: { username: newUser.username, email: newUser.email }
		});
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
}

const loginUser = async (req, res) => {
	try {
		const { username, password } = req.body;

		const user = await findUserByUsername(username);

		if (!user.id) throw new Error("Incorrect username or password.");

		const isValidPassword = await verifyPassword(password, user.password_hash);
		if (!isValidPassword) throw new Error("Incorrect username or password.");

		const token = createJWToken(user.id, user.username);

		const todoList = await getUserTodoLists(user.id);

		return res.status(201).json({
			message: "User logged successfully!",
			token,
			todoList,
			user: { username: user.username, email: user.email }
		});
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
}

module.exports = {
	createNewUser,
	loginUser
}