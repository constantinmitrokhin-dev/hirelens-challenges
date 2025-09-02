
const { TodoList, Task } = require("../db").conn.models;

const getUserTodoLists = async (userId) => {
	return await TodoList.findAll({
		where: { user_id: userId },
		include: [{ model: Task }]
	});
};

const addTodoList = async (req, res) => {
	try {
		const { name } = req.body;
		const userId = req.user.id;

		if (!name) {
			return res.status(400).json({ error: "List name is required" });
		}

		const newList = await TodoList.create({
			name,
			user_id: userId
		});

		return res.status(201).json({
			message: "To-Do List created successfully",
			todoList: newList
		});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const getTodoLists = async (req, res) => {
	try {
		const lists = await getUserTodoLists(req.user.id);

		return res.status(200).json({ todoLists: lists });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const updateTodoList = async (req, res) => {
	try {
		const { todo_list_id } = req.params;
		const { name } = req.body;
		const user_id = req.user.id;

		const list = await TodoList.findOne({ where: { id: todo_list_id, user_id } })
		if (!list) return res.status(404).json({ error: "List not found" });

		list.name = name || list.name;
		await list.save();

		return res.status(200).json({ todoList: list });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const deleteTodoList = async (req, res) => {
	try {
		const { todo_list_id } = req.params;
		const user_id = req.user.id;

		const list = await TodoList.findOne({ where: { id: todo_list_id, user_id } });
		if (!list) return res.status(404).json({ error: "List not found" });

		await list.destroy();
		return res.status(200).json({ listId: todo_list_id });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

module.exports = {
	addTodoList,
	getTodoLists,
	updateTodoList,
	deleteTodoList,
	getUserTodoLists
}