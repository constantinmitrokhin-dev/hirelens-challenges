
const { Router } = require("express");
const router = Router();
const { addTask, getTasks, updateTask, deleteTask } = require("../../controllers/task-controller.js");
const { authenticateJWT, authorizeUserAccess } = require("../../middleware/validateUserInput.js");
const { authorizeTodoListOwnership } = require("../../middleware/todoList-middleware.js");

//* Task
router.post("/add", authenticateJWT, authorizeUserAccess, authorizeTodoListOwnership, addTask);
router.get("/get", authenticateJWT, authorizeUserAccess, authorizeTodoListOwnership, getTasks);
router.put("/update/:id", authenticateJWT, authorizeUserAccess, authorizeTodoListOwnership, updateTask);
router.delete("/delete/:id", authenticateJWT, authorizeUserAccess, authorizeTodoListOwnership, deleteTask);

module.exports = router;
