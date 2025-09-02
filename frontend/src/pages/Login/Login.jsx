
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../app/userSlice";
import { setTodoLists } from "../../app/todoListSlice";
import Button from "../../components/Button/Button";
import CenteredCard from "../../components/CenteredCard/CenteredCard";

import styles from "./Login.module.css";

export default function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrorMsg("");

		const result = await dispatch(loginUser({ username, password }));

		if (result.meta.requestStatus === "fulfilled") {
			dispatch(setTodoLists(result.payload.todoList || []));
			navigate("/home");
		} else {
			setErrorMsg(result.payload || "Login failed");
		}
	};

	return (
		<CenteredCard title="Login">
			<form onSubmit={handleSubmit} className={styles.form}>
				<input
					placeholder="Username"
					value={username}
					onChange={e => setUsername(e.target.value)}
					className={styles.input}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={e => setPassword(e.target.value)}
					className={styles.input}
				/>
				<Button type="submit">Login</Button>
			</form>

			{errorMsg && <p className={styles.error}>{errorMsg}</p>}

			<p className={styles.registerLink}>
				Don’t have an account? <Link to="/register">Register here</Link>
			</p>
		</CenteredCard>
	);
}