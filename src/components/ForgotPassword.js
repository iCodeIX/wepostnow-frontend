import React, { useState } from "react";
import "../components/styles/ForgotPassword.css";
import axios from "axios";
import e from "cors";
const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const sendResetLink = (e) => {
        e.preventDefault();

        axios.post("/forgot-password", { email })
            .then(response => {
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    }
    return (
        <div className="forgot-pass-container">
            <h1>Reset Password</h1>
            <form className="reset-pass-form" onSubmit={sendResetLink}>
                <label>A reset password link will be sent to your email address!</label>
                <input type="email" value={email} placeholder="Enter your registered email" onChange={handleChangeEmail} />
                <button type="submit">SEND LINK</button>
            </form>
        </div>
    )
}

export default ForgotPassword;