
const { Task, TodoList } = require("../db").conn.models;

const addTask = async (req, res) => {
	try {
		const { name, todo_list_id } = req.body;
		if (!todo_list_id || !name) {
			return res.status(400).json({ error: "Todo list ID and task name are required." });
		}

		const todoList = await TodoList.findByPk(todo_list_id);
		if (!todoList) {
			return res.status(404).json({ error: "TodoList not found." });
		}

		const task = await Task.create({ todo_list_id, name });
		return res.status(201).json({ message: "Task created successfully.", task });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const getTasks = async (req, res) => {
	try {
		const { todo_list_id } = req.query;

		if (!todo_list_id) {
			return res.status(400).json({ error: "Todo list ID is required." });
		}

		const tasks = await Task.findAll({ where: { todo_list_id } });
		return res.status(200).json({ tasks });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const updateTask = async (req, res) => {
try {
	const { id } = req.params;
	const { name, is_completed } = req.body;

	if (isNaN(id)) {
		return res.status(400).json({ error: "Invalid task ID." });
	}

	const task = await Task.findByPk(id);
	if (!task) {
		return res.status(404).json({ error: "Task not found." });
	}

	if (name !== undefined) task.name = name;
	if (is_completed !== undefined) task.is_completed = is_completed;

		await task.save();
		return res.status(200).json({ message: "Task updated successfully.", task });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const deleteTask = async (req, res) => {
	try {
		const { id } = req.params;
		const task = await Task.findByPk(id);
		if (!task) {
			return res.status(404).json({ error: "Task not found." });
		}

		await task.destroy();
		return res.status(200).json({ message: "Task deleted successfully." });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

module.exports = {
	addTask,
	getTasks,
	updateTask,
	deleteTask
};
