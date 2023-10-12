import React, { useState } from "react";
import "../components/styles/ForgotPassword.css";
import axios from "axios";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [displayLinkSent, setDisplayLinkSent] = useState(false);
    const [error, setError] = useState(null);

    const sendResetLink = (e) => {
        e.preventDefault();



        axios.post("/forgot-password", { email })
            .then(response => {
                if (response.data.Status === "Success") {
                    setDisplayLinkSent(true);
                    setError(null);
                    setEmail("");
                } else {
                    setError(response.data.Status);
                    setDisplayLinkSent(false);
                }
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
                <p>A reset password link will be sent to your email address!</p>
                {
                    error && (<label>{error}</label>)
                }
                <input type="email" value={email} placeholder="Enter your registered email" onChange={handleChangeEmail} />
                {
                    displayLinkSent && (<label>Reset Password Link sent to your email!</label>)
                }
                <button type="submit">SEND LINK</button>
            </form>
        </div>
    )
}

export default ForgotPassword;