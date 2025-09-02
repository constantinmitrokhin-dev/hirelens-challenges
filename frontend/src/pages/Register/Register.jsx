
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import CenteredCard from "../../components/CenteredCard/CenteredCard";
import styles from "./Register.module.css";
import { registerUser } from "../../app/userSlice";

export default function Register() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [name, setName] = useState("");
	const [lastname, setLastname] = useState("");
	const [email, setEmail] = useState("");
	const [errors, setErrors] = useState({});

	// Regex
	const usernameRegex = /^[a-zA-Z0-9_]+$/;
	const nameRegex = /^[a-zA-Z íáúóéÍÁÓÚÉñÑ]*$/;
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	// Validations in real-time
	const validateField = (field, value) => {
		let message = "";

		switch (field) {
			case "username":
				if (!usernameRegex.test(value)) {
					message = "Username can only contain letters, numbers, and underscores.";
				}
				break;
			case "password":
				if (value.length < 8) {
					message = "Password must be at least 8 characters long.";
				} else if (/\s/.test(value)) {
					message = "Password cannot contain spaces.";
				}
				break;
			case "confirmPassword":
				if (value !== password) {
					message = "Passwords do not match.";
				}
				break;
			case "name":
				if (!nameRegex.test(value)) {
					message = "Name can only contain letters and accents.";
				}
				break;
			case "lastname":
				if (!nameRegex.test(value)) {
					message = "Lastname can only contain letters and accents.";
				}
				break;
			case "email":
				if (!emailRegex.test(value)) {
					message = "Invalid email address.";
				}
				break;
			default:
				break;
		}

		setErrors(prev => ({ ...prev, [field]: message }));
	};

	const handleSubmit = async e => {
		e.preventDefault();

		// Final validation check
		if (
			Object.values(errors).some(error => error !== "") ||
			!username ||
			!password ||
			!confirmPassword ||
			!name ||
			!lastname ||
			!email
		) {
			return;
		}

		const result = await dispatch(registerUser({ username, password, name, lastname, email }));
		if (result.meta.requestStatus === "fulfilled") navigate("/login");
	};

	return (
		<CenteredCard title="Register">
			<form onSubmit={handleSubmit} className={styles.form}>
				<input
					placeholder="Username"
					value={username}
					onChange={e => {
						setUsername(e.target.value);
						validateField("username", e.target.value);
					}}
					className={styles.input}
				/>
				{errors.username && <p className={styles.error}>{errors.username}</p>}

				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={e => {
						setPassword(e.target.value);
						validateField("password", e.target.value);
					}}
					className={styles.input}
				/>
				{errors.password && <p className={styles.error}>{errors.password}</p>}

				<input
					type="password"
					placeholder="Confirm Password"
					value={confirmPassword}
					onChange={e => {
						setConfirmPassword(e.target.value);
						validateField("confirmPassword", e.target.value);
					}}
					className={styles.input}
				/>
				{errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}

				<input
					placeholder="Name"
					value={name}
					onChange={e => {
						setName(e.target.value);
						validateField("name", e.target.value);
					}}
					className={styles.input}
				/>
				{errors.name && <p className={styles.error}>{errors.name}</p>}

				<input
					placeholder="Lastname"
					value={lastname}
					onChange={e => {
						setLastname(e.target.value);
						validateField("lastname", e.target.value);
					}}
					className={styles.input}
				/>
				{errors.lastname && <p className={styles.error}>{errors.lastname}</p>}

				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={e => {
						setEmail(e.target.value);
						validateField("email", e.target.value);
					}}
					className={styles.input}
				/>
				{errors.email && <p className={styles.error}>{errors.email}</p>}

				<Button type="submit">Register</Button>
			</form>
		</CenteredCard>
	);
}
