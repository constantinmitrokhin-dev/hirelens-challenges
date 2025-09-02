
const { Router } = require('express');
const router = Router();
const userRouter = require('./User/user');
const taskRouter = require('./Task/task');
const todoListRouter = require('./TodoList/todoList');

// Mount routes
	//* User - Services
router.use('/user', userRouter);

	//* Task - Services
router.use('/task', taskRouter);

	//* TodoList - Services
router.use('/todolist', todoListRouter);

module.exports = router;
