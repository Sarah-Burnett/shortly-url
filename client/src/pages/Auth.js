import React, { useState } from "react";
import styled from "styled-components";
import { white, desktop } from "../components/Styles";
import Login from "../components/auth/Login";
import Logout from "../components/auth/Logout";
import Signup from "../components/auth/Signup";
import image from "../images/illustration-working.svg";
import { loginUrl, signupUrl } from "../utilities/urls";

const AuthPg = styled.div`
	background: ${white};
	margin: auto;
	@media (min-width: ${desktop}) {
		display: flex;
		flex-direction: row-reverse;
		min-height: 70vh;
	}
`;

const Img = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	img {
		max-width: 100%;
		padding: 1vh 1vw;
	}
	@media (min-width: ${desktop}) {
		min-height: 70vh;
		width: 70vw;
	}
`;

const Auth = ({ auth }) => {
	const [formValues, setFormValues] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		password2: '',
	});
	return (
		<AuthPg>
			{auth === "login" && (
				<Login
					formValues={formValues}
					setFormValues={setFormValues}
					loginUrl={loginUrl}
				/>
			)}
			{auth === "logout" && <Logout />}
			{auth === "signup" && (
				<Signup
					formValues={formValues}
					setFormValues={setFormValues}
					signupUrl={signupUrl}
				/>
			)}
			<Img>
				<img src={image} alt="woman working at desk" />
			</Img>
		</AuthPg>
	);
};

export default Auth;
