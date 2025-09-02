
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask, deleteTask } from "../../app/taskSlice";
import styles from "./Note.module.css";
import Button from "../Button/Button";

export default function Note({ task, listId }) {
	const dispatch = useDispatch();
	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState(task.name);

	const handleToggleCompleted = () => {
		dispatch(updateTask({ listId, taskId: task.id, updates: { is_completed: !task.is_completed } }));
	};

	const handleSave = () => {
		dispatch(updateTask({ listId, taskId: task.id, updates: { title } }));
		setIsEditing(false);
	};

	const handleDelete = () => {
		dispatch(deleteTask({ listId, taskId: task.id }));
	};

	return (
		<div className={styles.note}>
			<div className={styles.noteContent}>
				<input
					type="checkbox"
					checked={task.is_completed}
					onChange={handleToggleCompleted}
				/>
				{isEditing ? (
					<input
						className={styles.editInput}
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				) : (
					<span className={task.is_completed ? styles.completed : ""}>
						{task.name}
					</span>
				)}
			</div>

			<div className={styles.noteButtons}>
				{isEditing ? (
					<>
						<Button onClick={handleSave}>Save</Button>
						<Button onClick={() => { setIsEditing(false); setTitle(task.name); }}>Cancel</Button>
					</>
				) : (
					<>
						<Button onClick={() => setIsEditing(true)}>Edit</Button>
						<Button onClick={handleDelete}>Delete</Button>
					</>
				)}
			</div>
		</div>
	);
}
