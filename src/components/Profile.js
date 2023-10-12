import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import "./styles/Profile.css";
import UserPosts from "./UserPosts";
import { UserPostsContext } from "./UserContext";

//libraries
import { ColorRing } from "react-loader-spinner";

//icons and images
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Neutral from "./images/neutral.png";
import Male from "./images/male.png";
import Female from "./images/female.png";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

//helper functions 
import { validatePassword } from "../utility/formValidation";

const UpdateProfile = ({ c_id, setToogleUpdate, bio, gender, profileImg, fetchUser, fetchAllPosts }) => {
    const [photoPrevFile, setPhotoPrevFile] = useState(null);
    const [showUpdatePassword, setShowUpdatePassword] = useState(false);
    const [updateForm, setUpdateForm] = useState({
        id: c_id,
        bio: bio,
        profileImg: profileImg,
        gender: gender
    });

    const [showSpinner, setShowSpinner] = useState(false);

    const photoPrevUrl = photoPrevFile !== null && URL.createObjectURL(photoPrevFile);

    const updateProfile = (e) => {
        e.preventDefault();
        setShowSpinner(true);
        axios.post("/update-profile", updateForm, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then((response) => {
                setUpdateForm(response.data);
                setToogleUpdate(false);
                fetchUser();
                fetchAllPosts();
                setShowSpinner(false);
            })
            .catch((err) => {
                console.log(err);
                setShowSpinner(false);
            })

    }


    const handleUpdateForm = (e) => {
        let bio = e.target.value;

        if (e.target.name === "profileImg") {
            setUpdateForm({
                ...updateForm,
                "profileImg": e.target.files[0]
            })

            setPhotoPrevFile(
                e.target.files[0]
            )

        } else {
            setUpdateForm({
                ...updateForm,
                bio
            })
        }
    }

    const handleGenderChange = (e) => {
        const gender = e.target.value;
        setUpdateForm(
            {
                ...updateForm,
                gender,
            }
        )
    }

    return (

        <div className="updateprofile-container">

            <button className="updatecancel-btn" onClick={() => setToogleUpdate(false)}><CloseOutlinedIcon /> </button>
            <div className="photoprev-container">
                <img src={photoPrevFile !== null ? photoPrevUrl : profileImg} alt="profile" />
            </div>
            <form className="updateProfile-form" onSubmit={updateProfile}>
                <input className="updatedPhotoInput" type="file" name="profileImg" onChange={handleUpdateForm} />
                <div className="form-input-reg">
                    <label>Gender</label>
                    <div className="gender-radio-btns">
                        <input type="radio" name="gender" value="male" onChange={handleGenderChange} checked={updateForm.gender === "male"} /><label className="gender-label">Male</label>
                        <input type="radio" name="gender" value="female" onChange={handleGenderChange} checked={updateForm.gender === "female"} /><label className="gender-label">Female</label>
                        <input type="radio" name="gender" value="neutral" onChange={handleGenderChange} checked={updateForm.gender === "neutral"} /><label className="gender-label">Neutral</label>
                    </div>
                </div>
                <label>Bio:</label>
                <textarea className="updatedBioTextArea" name="updatedBio" value={updateForm.bio} onChange={handleUpdateForm}></textarea>
                <button className="updateProfile-btn" type="submit">Update</button>
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
            <button className="change-pass-toogle-btn" onClick={() => setShowUpdatePassword(!showUpdatePassword)}>Change Password?</button>
            {
                showUpdatePassword && (<UpdatePassword id={updateForm.id} />)
            }
        </div>
    )
}

const UpdatePassword = ({ id }) => {
    const [passwordShow, setPasswordShow] = useState(false);
    const [passwordForm, setPasswordForm] = useState({
        newPassword: "",
        oldPassword: "",
        userId: id
    });
    const [displayChangePassStatus, setDisplayChangePassStatus] = useState("");
    const [showSpinner, setShowSpinner] = useState(false);

    const navigate = useNavigate();

    const handlePasswordChangeForm = (e) => {
        const { name, value } = e.target;
        setPasswordForm({
            ...passwordForm,
            [name]: value
        }

        )
    }

    const backToLogin = () => {
        setTimeout(() => {
            localStorage.removeItem('id');
            navigate("/login");

        }, 3000);
    }
    const updatePassword = (e) => {
        e.preventDefault();
        setShowSpinner(true);

        if (validateFormPassword()) {
            setDisplayChangePassStatus("");

            const checkSuccessUpdate = axios.post("/update-password", passwordForm)
                .then((response) => {
                    if (response.status === 200) {
                        setShowSpinner(false);
                        setDisplayChangePassStatus("Password change success! You will be logout in 3scs!");
                        backToLogin();
                    }
                })
                .catch((err) => {
                    setShowSpinner(false);
                    setDisplayChangePassStatus(err.response.data.message);
                })
        } else {
            setShowSpinner(false);
        }
    }

    const validateFormPassword = () => {

        const validatePasswordResult = validatePassword(passwordForm.newPassword);
        if (validatePasswordResult) {
            setDisplayChangePassStatus(validatePasswordResult);
            return false;
        }

        return true;
    }

    return (
        <form className="change-pass-form" type="submit" onSubmit={updatePassword}>
            {displayChangePassStatus && (<p className="password-status-msg">{displayChangePassStatus}</p>)}
            <div className="form-input-update-pass">
                <label>Old password:</label>
                <input type="password" value={passwordForm.oldPassword} onChange={handlePasswordChangeForm} name="oldPassword" />
                <div className="password-visibility-container">
                    <label htmlFor="password" className="text-light">New Password</label>
                    <span className="visibility-icon" onClick={() => setPasswordShow(!passwordShow)}>
                        {
                            passwordShow ? <VisibilityIcon /> : <VisibilityOffIcon />
                        }
                    </span>
                </div>


                <input type={passwordShow ? "text" : "password"} id="password" value={passwordForm.newPassword} onChange={handlePasswordChangeForm} name="newPassword" />
            </div>
            <button className="change-pass-btn">Click to Change</button>
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
    )
}


const LogoutModal = ({ setShowLogoutNotif }) => {
    const navigate = useNavigate();

    const logoutAccount = () => {
        localStorage.removeItem('id')


        navigate('/');
    }
    return (
        <div className="logout-modal">
            <p>Are you sure to logout your account?</p>
            <div className="logout-btns">
                <button className="logout-yes-btn" onClick={() => logoutAccount()}>Yes</button>
                <button className="logout-no-btn" onClick={() => setShowLogoutNotif(false)}>No</button>
            </div>
        </div>
    )
}

const MessageModal = ({ setShowMessageModal, sender, receiver }) => {

    const [userMessage, setUserMessage] = useState({
        sender: sender,
        receiver: receiver,
        message: ""
    });

    const navigate = useNavigate();
    const handleMessageChangeForm = (e) => {
        const msg = e.target.value;
        setUserMessage({
            ...userMessage,
            message: msg
        })
    }

    const createMessage = (e) => {
        e.preventDefault();

        axios.post("/send-message", userMessage)
            .then((response) => {
                navigate("/message");
            })
            .catch(err =>
                console.log(err)
            );
    }

    return (
        <div className="message-modal-container">
            <form className="message-form" onSubmit={createMessage}>
                <textarea placeholder="Write your message" name="message" value={userMessage.message} onChange={handleMessageChangeForm}></textarea>
                <button type="submit">S E N D</button>
            </form>
        </div>
    )
}
const Profile = () => {
    const c_id = localStorage.getItem("id");
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [toogleUpdateProfile, setToogleUpdateProfile] = useState(false);
    const [userPosts, setUserPosts] = useState(null);
    const [showLogoutNotif, setShowLogoutNotif] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false);

    useEffect(() => {
        fetchUser();

    }, []);

    useEffect(() => {
        fetchUserPosts();

    }, []);

    const fetchUser = async () => {

        await axios.get("/profile/" + id)
            .then((response) => {

                setUser(response.data);
            })
            .catch(err => console.log(err));

    }

    const fetchUserPosts = async () => {

        await axios.get("/posts/userposts/" + id)
            .then((response) => {
                setUserPosts(response.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }


    return (
        <div className="profile-container">
            {
                user && (
                    <>
                        <div className="profile-details-container">
                            {
                                c_id === id ? (<><button className="edit-profile-btn" onClick={() => { setToogleUpdateProfile(!toogleUpdateProfile) }}><EditNoteOutlinedIcon /><span>Update Profile</span></button>
                                    <button className="logout-btn" onClick={() => setShowLogoutNotif(!showLogoutNotif)}>
                                        <span> Logout </span>
                                    </button>
                                </>) : (
                                    <button className="send-msg-btn" onClick={() => setShowMessageModal(!showMessageModal)}>
                                        <span>Send Message </span>
                                    </button>
                                )
                            }

                            {
                                toogleUpdateProfile && <UpdateProfile c_id={c_id} setToogleUpdate={setToogleUpdateProfile} bio={user.bio} gender={user.gender} profileImg={user.profileImg} fetchUser={fetchUser} fetchAllPosts={fetchUserPosts} />
                            }

                            {
                                showLogoutNotif && (<LogoutModal setShowLogoutNotif={setShowLogoutNotif} />)
                            }

                            {
                                showMessageModal && (<MessageModal setShowMessageModal={setShowMessageModal} sender={c_id} receiver={id} />)
                            }

                            <img className="user-profile-photo" src={user.profileImg} alt="profile" />
                            <div className="details-text-container">
                                <p className="profile-name">
                                    <img src={user.gender === "male" ? Male :
                                        user.gender === "female" ? Female :
                                            user.gender === "neutral" ? Neutral : ""}
                                        className="gender-icon" alt="gender" />{user.username}</p>
                                <p className="profile-bio">"{user.bio}"</p>
                            </div>
                        </div>
                        {
                            userPosts?.length > 0 ? (
                                <UserPostsContext.Provider value={userPosts}>
                                    <UserPosts fetchUserPosts={fetchUserPosts} />
                                </UserPostsContext.Provider>)
                                : (<div className="no-posts-container">
                                    <span className="no-posts">User has no post to show!</span>
                                </div>)
                        }




                    </>


                )

            }

        </div>
    )

}

export default Profile;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       