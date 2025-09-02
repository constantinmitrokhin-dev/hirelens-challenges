
import React from "react";
import styles from "./CenteredCard.module.css";

export default function CenteredCard({ title, children }) {
	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h2 className={styles.title}>{title}</h2>
				{children}
			</div>
		</div>
	);
}