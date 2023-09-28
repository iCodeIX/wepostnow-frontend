import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "./styles/Signup.css";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
//icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

//helper functions
import { validateUsername, validateEmail, validatePassword } from "../utility/utils";

const Signup = () => {
    const [createForm, setCreateForm] = useState({
        username: "",
        email: "",
        password: "",
        profileImg: "",
        gender: "male"
    });
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState("");
    const [passwordShow, setPasswordShow] = useState(false);
    const navigate = useNavigate();
    const [showSpinner, setShowSpinner] = useState(false);
    const cookieId = localStorage.getItem("id");

    useEffect(() => {
        cookieId !== null && (navigate('/main'))
    }, []);


    const handleCreateFormChange = (e) => {
        const { name, value } = e.target;


        if (name === "profileImg") {

            setCreateForm(
                {
                    ...createForm,
                    [name]: e.target.files[0]
                }
            )

        }
        else {
            setCreateForm(
                {
                    ...createForm,
                    [name]: value,
                }
            )
        }

    }

    const handleGenderChange = (e) => {
        const gender = e.target.value;
        setCreateForm(
            {
                ...createForm,
                gender,
            }
        )
    }

    const createUser = async (e) => {
        e.preventDefault();

        if (handleFormValidation()) {
            setShowSpinner(true);
            try {
                const userCreate = await axios.post("/signup", createForm, { headers: { 'Content-Type': 'multipart/form-data' } })
                    .then((response) => {
                        setShowSpinner(false);
                        return response.data;
                    })
                    .catch((err) => {
                        setShowSpinner(false);
                        setError(err.response.data.error);
                        setShowError(true);

                    });


                if (userCreate) {
                    setShowSpinner(false);
                    navigate('/main');
                    localStorage.setItem('id', userCreate._id);
                }

            } catch (error) {
                console.log(error);
            }

        }
    }

    const handleFormValidation = () => {
        let validateUsernameResult = validateUsername(createForm.username);
        let validateEmailResult = validateEmail(createForm.email);
        let validatePasswordResult = validatePassword(createForm.password);

        if (validateUsernameResult) {
            setError(validateUsernameResult);
        } else if (validateEmailResult) {
            setError(validateEmailResult);
        } else if (validatePasswordResult) {
            setError(validatePasswordResult);
        } else {
            setShowError(false);
            return true;
        }
        setError && setShowError(true);
    }

    const LoginLinkStyle = {
        textDecoration: "none",
        color: "#1A72E8",
        fontWeight: "700",
        fontSize: "16px",
        letterSpacing: "1px"
    }

    return (
        <div className="signup-container">

            <form className="signup-form" onSubmit={createUser}>

                <p className="signup-text">Create your Account</p>
                {showError && (<p className="error-msg">{error}</p>)}
                <div className="form-input-reg">
                    <label htmlFor="name" className="text-light">Username</label>
                    <input type="text" id="name" value={createForm.username} onChange={handleCreateFormChange} name="username" />
                </div>
                <div className="form-input-reg">
                    <label htmlFor="email" className="text-light">Email</label>
                    <input type="email" id="email" value={createForm.email} onChange={handleCreateFormChange} name="email" />
                </div>
                <div className="form-input-reg">
                    <div className="password-visibility-container">
                        <label htmlFor="password" className="text-light">Password</label>
                        <span className="visibility-icon" onClick={() => setPasswordShow(!passwordShow)}>
                            {
                                passwordShow ? <VisibilityIcon /> : <VisibilityOffIcon />
                            }
                        </span>
                    </div>

                    <input type={passwordShow ? "text" : "password"} id="password" value={createForm.password} onChange={handleCreateFormChange} name="password" />
                </div>
                <div className="form-input-reg">
                    <label>Gender</label>
                    <div className="gender-radio-btns">
                        <input type="radio" name="gender" value="male" onChange={handleGenderChange} checked={createForm.gender === "male"} /><label className="gender-label">Male</label>
                        <input type="radio" name="gender" value="female" onChange={handleGenderChange} checked={createForm.gender === "female"} /><label className="gender-label">Female</label>
                        <input type="radio" name="gender" value="neutral" onChange={handleGenderChange} checked={createForm.gender === "neutral"} /><label className="gender-label">Neutral</label>
                    </div>
                </div>
                <div className="form-input-reg">
                    <label htmlFor="avatar" className="text-light">Profile Photo</label>
                    <input type="file" id="profileImg" name="profileImg" onChange={handleCreateFormChange} />
                </div>
                <button className="signup-btn" type="submit">Create Account</button>
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
            <Link to="/login" style={LoginLinkStyle}>Log in instead</Link>
        </div>
    )
}

export default Signup;