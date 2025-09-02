
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, addTask } from "../../app/taskSlice";
import { updateTodoList, deleteTodoList } from "../../app/todoListSlice";
import Note from "../Note/Note";
import Button from "../Button/Button";
import styles from "./Category.module.css";

export default function Category({ list, tasksOverride }) {
	const dispatch = useDispatch();
	const tasksFromStore = useSelector(
		(state) => state.tasks.tasksByList[list.id] || []
	);
	const tasks = tasksOverride || tasksFromStore;

	const [newTask, setNewTask] = useState("");
	const [editingName, setEditingName] = useState(false);
	const [listName, setListName] = useState(list.name);

	useEffect(() => {
	if (list.id) {
		dispatch(fetchTasks(list.id));
	}
	}, [dispatch, list.id]);

	const handleAddTask = () => {
		if (newTask.trim()) {
			dispatch(addTask({ listId: list.id, task: { title: newTask } }));
			setNewTask("");
		}
	};

	const handleNameEdit = () => {
		setEditingName(true);
	};

	const handleNameChange = (e) => {
		setListName(e.target.value);
	};

	const handleNameSubmit = () => {
		if (listName.trim() && listName !== list.name) {
			dispatch(updateTodoList({ listId: list.id, name: listName }));
		}
		setEditingName(false);
	};

	const handleDelete = () => {
		if (window.confirm("Are you sure you want to delete this list?")) {
			dispatch(deleteTodoList(list.id));
		}
	};

	return (
		<div className={styles.todoList}>
			{/* Header con nombre editable */}
			<div className={styles.listHeader}>
				{editingName ? (
					<input
						className={styles.listNameInput}
						value={listName}
						onChange={handleNameChange}
						onBlur={handleNameSubmit}
						onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
						autoFocus
					/>
				) : (
					<h2 className={styles.listTitle} onDoubleClick={handleNameEdit}>
						{list.name}
					</h2>
				)}
				<Button className={styles.deleteButton} onClick={handleDelete}>
					Delete
				</Button>
			</div>

			{/* Notas */}
			<div className={styles.notes}>
				{tasks.length > 0 ? (
					tasks.map((task) => <Note key={task.id} task={task} listId={list.id} />)
				) : (
					<p style={{ color: "#666", fontStyle: "italic" }}>No tasks here.</p>
				)}
			</div>

			{/* Input para nueva tarea */}
			<div className={styles.addTask}>
				<input
					className={styles.taskInput}
					value={newTask}
					onChange={(e) => setNewTask(e.target.value)}
					placeholder="New Task"
				/>
				<Button className={styles.addButton} onClick={handleAddTask}>
					Add
				</Button>
			</div>
		</div>
	);
}
