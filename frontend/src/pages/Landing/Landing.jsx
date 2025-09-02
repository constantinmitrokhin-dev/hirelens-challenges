
import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from "./Landing.module.css"

export default function Landing() {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Welcome to My Task App</h1>
			<p className={styles.subtitle}>Manage your lists and tasks easily</p>
			<div className={styles.buttonContainer}>
				<Link to="/login">
					<Button>Login</Button>
				</Link>
				<Link to="/register">
					<Button>Register</Button>
				</Link>
			</div>
		</div>
	);
}
