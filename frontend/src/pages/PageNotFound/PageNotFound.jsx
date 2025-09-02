
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import CenteredCard from "../../components/CenteredCard/CenteredCard"
import styles from "./PageNotFound.module.css";

export default function PageNotFound() {
	const navigate = useNavigate();

	const goHome = () => {
		navigate("/");
	};

	return (
		<CenteredCard title="404 - Page Not Found">
			<p className={styles.subtitle}>Sorry, the page you are looking for does not exist.</p>
			<Button onClick={goHome}>Go Back Home</Button>
		</CenteredCard>
	);
}
