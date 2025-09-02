
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodoLists, addTodoList } from "../../app/todoListSlice";
import Category from "../../components/Category/Category";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import CenteredCard from "../../components/CenteredCard/CenteredCard";
import styles from "./Home.module.css";

export default function Home() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const todoLists = useSelector((state) => state.todoLists.lists);
	const tasksByList = useSelector((state) => state.tasks.tasksByList);
	const token = useSelector((state) => state.user.token);

	const [newList, setNewList] = useState("");
	const [selectedList, setSelectedList] = useState("All");
	const [completionFilter, setCompletionFilter] = useState("All");

	// Redirect if not logged
	useEffect(() => {
		if (!token) navigate("/login");
		else dispatch(fetchTodoLists());
	}, [dispatch, token, navigate]);

	const handleAddList = () => {
		const trimmed = newList.trim();
		if (trimmed) {
			dispatch(addTodoList({ name: trimmed }));
			setNewList("");
		}
	};

	const filterTasks = (list) => {
		const tasks = tasksByList[list.id] || [];

		if (completionFilter === "Active") {
			return tasks.filter((t) => !t.is_completed);
		}
		if (completionFilter === "Archived") {
			return tasks.filter((t) => t.is_completed);
		}
		return tasks;
	};

	return (
		<>
			<Header title="Welcome!">
				<CenteredCard title="My To-Do Lists">

					{/* Filters */}
					{todoLists.length > 0 && (
						<div className={styles.filterContainer}>
							<div className={styles.filterGroup}>
								<label htmlFor="listFilter" className={styles.filterLabel}>
									Filter by List:
								</label>
								<select
									id="listFilter"
									className={styles.filterSelect}
									value={selectedList}
									onChange={(e) => setSelectedList(e.target.value)}
								>
									<option value="All">All</option>
									{todoLists.map((list) => (
										<option key={list.id} value={list.id}>
											{list.name}
										</option>
									))}
								</select>
							</div>

							<div className={styles.filterGroup}>
								<label htmlFor="completionFilter" className={styles.filterLabel}>
									Filter by Completion:
								</label>
								<select
									id="completionFilter"
									className={styles.filterSelect}
									value={completionFilter}
									onChange={(e) => setCompletionFilter(e.target.value)}
								>
									<option value="All">All</option>
									<option value="Active">Active</option>
									<option value="Archived">Archived</option>
								</select>
							</div>
						</div>
					)}

					{/* Rendering Filters */}
					{todoLists
						.filter(
							(list) =>
								selectedList === "All" || list.id === parseInt(selectedList)
						)
						.map((list) => (
							<Category
								key={list.id}
								list={list}
								tasksOverride={filterTasks(list)} // Filtered Notes (Tasks)
							/>
						))}

					{/* Create new Category (ToDo-List) */}
					<div className={styles.newListContainer}>
						<input
							className={styles.input}
							value={newList}
							onChange={(e) => setNewList(e.target.value)}
							placeholder="New To-Do List"
						/>
						<Button onClick={handleAddList}>Create List</Button>
					</div>
				</CenteredCard>
			</Header>
		</>
	);
}
