import axios from "axios";
import "./styles/NewPostField.css";
import { useContext, useState } from "react";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import InsertPhotoRoundedIcon from '@mui/icons-material/InsertPhotoRounded';
import { PostContext } from "./UserContext";
import ClearIcon from '@mui/icons-material/Clear';
import { ColorRing } from "react-loader-spinner";

const NewPostField = ({ fetchPosts }) => {
    const c_id = localStorage.getItem("id");
    const [toogleNewPostForm, setToogleNewPostForm] = useState(false);
    const [notifyPosted, setNotifyPosted] = useState(false);
    const [postForm, setPostForm] = useState({
        postContent: "",
        userId: c_id,
        postImage: ""
    });
    const [showSpinner, setShowSpinner] = useState(false);
    const [displayPostImagePrev, setDisplayPostImagePrev] = useState(false);
    const [postImagePrev, setPostImagePrev] = useState(null);
    const { setPosts, posts } = useContext(PostContext);


    const postImageURL = postImagePrev && URL.createObjectURL(postImagePrev);

    function handlePostForm(e) {
        const { name, value } = e.target;

        if (name === "postImage") {
            setPostImagePrev(e.target.files[0]);
            setDisplayPostImagePrev(true);

            setPostForm({
                ...postForm,
                [name]: e.target.files[0],
            })

        } else {
            setPostForm({
                ...postForm,
                [name]: value,
            })

        }


    }

    async function addPost(e) {
        e.preventDefault();
        setShowSpinner(true);
        await axios.post("/create-post", postForm, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then((response) => {
                setShowSpinner(false);
                setPosts([
                    ...posts,
                    response.data
                ]);
            }).catch((err) => {
                console.log(err);
                setShowSpinner(false);
            }
            );

        setToogleNewPostForm(!toogleNewPostForm);
        setNotifyPosted(true);
        closeNotify();
        fetchPosts();
    }

    function closeNotify() {
        setTimeout(() => {
            setNotifyPosted(false);
        }, "2000")
    }

    const removeImage = () => {
        setDisplayPostImagePrev(false);
        setPostImagePrev(null);



    }
    return (<div className="newpost-container-bg-container">
        <div className="newpost-containter">
            <button className="post-btn" onClick={() => setToogleNewPostForm(true)}>What's on your mind?</button>
        </div>
        {
            toogleNewPostForm && (
                <div className="newpostfield-container-bg">
                    <div className="newpostfield-container">
                        <button className="cancelpost-btn" onClick={() => setToogleNewPostForm(!toogleNewPostForm)}><CloseOutlinedIcon /></button>
                        <form className="newpost-form" onSubmit={addPost}>
                            <div className="form-textarea">
                                <textarea onChange={handlePostForm} value={postForm.postContent} name="postContent" className="form-textarea-input" placeholder="Whats on your mind?"></textarea>
                            </div>
                            {
                                displayPostImagePrev && (
                                    <div className="post-image-container">
                                        <div className="remove-image-btn" onClick={() => { removeImage() }}>
                                            <ClearIcon style={{ color: "#ffffff", fontSize: "24px" }} />
                                        </div>
                                        <img src={postImageURL} alt="post image" />
                                    </div>)
                            }

                            <div className="insert-photo-btn">
                                <label htmlFor="file-input">
                                    <InsertPhotoRoundedIcon style={{ color: "#45BD62", cursor: "pointer", fontSize: "36px" }} />
                                </label>
                                <input id="file-input" onChange={handlePostForm} style={{ display: "none" }} type="file" name="postImage" />
                            </div>

                            <button className="newpost-btn" type="submit">POST</button>
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
                    </div>
                </div>

            )
        }
        {
            notifyPosted && (
                <p className="notify-posted"> Message posted!</p>

            )
        }
    </div>

    )
}

export default NewPostField;