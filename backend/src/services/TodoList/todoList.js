
const { Router } = require("express");
const router = Router();
const { addTodoList, getTodoLists, updateTodoList, deleteTodoList } = require("../../controllers/todoList-controller.js");
const { authenticateJWT, authorizeUserAccess } = require("../../middleware/validateUserInput.js");
const { authorizeTodoListOwnership } = require("../../middleware/todoList-middleware.js")

//* To-Do List
router.post("/add", authenticateJWT, authorizeUserAccess, addTodoList);
router.get("/get", authenticateJWT, authorizeUserAccess, authorizeTodoListOwnership, getTodoLists);
router.put("/update/:todo_list_id", authenticateJWT, authorizeUserAccess, authorizeTodoListOwnership, updateTodoList);
router.delete("/delete/:todo_list_id", authenticateJWT, authorizeUserAccess, authorizeTodoListOwnership, deleteTodoList);

module.exports = router;
