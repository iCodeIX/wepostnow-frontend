
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

//helper functions
import { validatePassword } from "../utility/utils";
const ResetPassword = () => {

    const [password, setPassword] = useState("");
    const { id, token } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const sendResetLink = (e) => {
        e.preventDefault();

        if (handleFormValidation()) {
            axios.post(`/reset-password/${id}/${token}`, { password })
                .then(response => {
                    if (response.data.Status === "Success") {
                        navigate("/login");
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }

    }

    const handleFormValidation = () => {
        let validatePasswordResult = validatePassword(password);

        if (validatePasswordResult) {
            setError(validatePasswordResult);
        } else {
            return true;
        }

    }

    const handleChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    }
    return (
        <div className="forgot-pass-container">
            <h1>New Password</h1>
            {error && (<p className="error-msg">{error}</p>)}
            <form className="reset-pass-form" onSubmit={sendResetLink}>
                <label>Enter new password</label>
                <input type="password" value={password} placeholder="Enter new password" onChange={handleChangePassword} />
                <button type="submit">UPDATE</button>
            </form>
        </div>
    )
}

export default ResetPassword;