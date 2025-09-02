
const { TodoList, Task  } = require("../db").conn.models;

const authorizeTodoListOwnership = async (req, res, next) => {

	try {
		const userId = req.user.id;
		let todoListId = req.body.todo_list_id || req.params.todo_list_id;
		// Si no se pasó, buscamos el task y tomamos su todo_list_id
		if (!todoListId && req.params.id) {
			const task = await Task.findByPk(req.params.id);
			if (!task) return res.status(404).json({ error: "Task not found." });
			todoListId = task.todo_list_id;
		}
		if (!todoListId && (req.method !== "GET")) {
			return res.status(400).json({ error: "Todo list ID is required." });
		} else {
			const todoList = await TodoList.findByPk( todoListId);
			if (!todoList) return res.status(404).json({ error: "TodoList not found." });
			if (todoList.user_id !== userId) return res.status(403).json({ error: "Not authorized to access this TodoList." });
		}
		next();
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

module.exports = {
	authorizeTodoListOwnership
};
