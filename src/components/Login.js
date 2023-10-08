import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/Login.css";
import { ColorRing } from "react-loader-spinner";
//icons 
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login = () => {


    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: "",
        profileImg: "",
    })

    const [wrongPassDisp, setWrongPassDisp] = useState(false);
    const [error, setError] = useState("");
    const [passwordShow, setPasswordShow] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    
    const cookieId = localStorage.getItem("id");
    useEffect(() => {
        cookieId !== null && (navigate('/main'))
    }, []);



    const handleLoginFormChange = (e) => {

        const { name, value } = e.target;

        setLoginForm({
            ...loginForm,
            [name]: value,
        })
    }

    const loginUser = async (e) => {

        e.preventDefault();
        setShowSpinner(true);
        if (loginForm.username === "" || loginForm.password === "") {
            setShowSpinner(false);
            setWrongPassDisp(true);
            setError("Username or Password cannot be empty!")
        } else {
            try {
                const userCheck = await axios.post("/login", loginForm)
                    .then(response => {
                        setShowSpinner(false);
                        return response.data;
                    })
                    .catch((err) => {
                        setWrongPassDisp(true);
                        setShowSpinner(false);
                        setError(err.response.data.error);

                    });


                if (userCheck) {
                    navigate('/main');
                    localStorage.setItem('id', userCheck.user._id);
                } else {
                    setShowSpinner(false);
                    setWrongPassDisp(true);
                }
            } catch (err) {
                console.log(err);
            }
        }

    }

    const SignUpLinkStyle = {
        textDecoration: "none",
        color: "#1A72E8",
        fontWeight: "600",
        fontSize: "14px",
        letterSpacing: "1px",
        margin: "10px"
    }

    const ForgotPassLinkStyle = {
        textDecoration: "none",
        color: "red",
        fontWeight: "700",
        fontSize: "14px",
        letterSpacing: "1px",
        margin: "5px",
        alignSelf: "flex-end"
    }
    return (
        <div className="login-container">

            <p className="welcome-text">Welcome back</p>
            <form className="login-form" onSubmit={loginUser}>
                {wrongPassDisp && (
                    <>
                        <p className="wrongdetails-alert">{error}</p>
                    </>
                )}

                <div className="form-input-login">
                    <label htmlFor="name" className="text-light">Username</label>
                    <input type="text" id="name" value={loginForm.username} onChange={handleLoginFormChange} name="username" />
                </div>
                <div className="form-input-login">
                    <div className="password-visibility-container">
                        <label htmlFor="password" className="text-light">Password</label>
                        <span className="visibility-icon" onClick={() => setPasswordShow(!passwordShow)}>
                            {
                                passwordShow ? <VisibilityIcon /> : <VisibilityOffIcon />
                            }
                        </span>
                    </div>

                    <input type={passwordShow === true ? "text" : "password"} id="password" value={loginForm.password} onChange={handleLoginFormChange} name="password" />
                </div>
                <Link to="/signup" style={ForgotPassLinkStyle}>Forgot Password</Link>
                <button className="login-btn" type="submit">Login</button>
                <ColorRing
                    visible={showSpinner}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{ position: "absolute" }}
                    wrapperClass="blocks-wrapper"
                    colors={['#1A72E8', '#FFE019', '#1A72E8', '#FFE019', '#1A72E8']}
                />
            </form>
            <p className="nyam-text">Not yet a Member?</p>
            <Link to="/signup" style={SignUpLinkStyle}>Register here</Link>

        </div>
    )
}

export default Login;