
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../app/userSlice";
import Button from "../Button/Button";
import styles from "./Header.module.css";

export default function Header({ title, children }) {
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<div className={styles.wrapper}>
			<header className={styles.header}>
				<h1 className={styles.title}>{title}</h1>
				<Button className={styles.logoutButton} onClick={handleLogout}>
					Logout
				</Button>
			</header>
			<div className={styles.content}>
				{children}
			</div>
		</div>
	);
}

