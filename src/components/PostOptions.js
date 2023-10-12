import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

//icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ShareIcon from '@mui/icons-material/Share';



const PostOptions = ({ setToogleOptions, post_id, fetchPosts, user_id, poster_id, showDeleteModal, setShowDeleteModal }) => {

    return (
        <div className="options-container">
            {
                user_id === poster_id && (
                    <div className="options-item">
                        <div className="delete-btn" onClick={() => { setShowDeleteModal(!showDeleteModal); }}>
                            <DeleteForeverIcon style={{ color: "fff", fontSize: "20px" }} />
                            <Link to="" style={{ color: "#fff", textDecoration: "none", width: "100%" }}>Delete</Link>
                        </div>
                    </div>)
            }
            <div className="options-item">
                <div className="share-btn">
                    <ShareIcon style={{ color: "fff", fontSize: "20px" }} />
                    <Link to={`/edit_post/${post_id}`} style={{ color: "#fff", textDecoration: "none", width: "100%" }}>Share</Link>
                </div>
            </div>
            {
                showDeleteModal && (<DeletePostModal setToogleOptions={setToogleOptions} fetchPosts={fetchPosts} setShowDeleteModal={setShowDeleteModal} post_id={post_id} />)
            }


        </div>
    )
}


const DeletePostModal = ({ setToogleOptions, fetchPosts, setShowDeleteModal, post_id }) => {

    const closeModal = () => {
        setShowDeleteModal(false);
    }


    const deletePost = () => {


        axios.post("/delete-post", { post_id })
            .then((response) => {
                console.log(response);
                fetchPosts();
                setShowDeleteModal(false);
                setToogleOptions(false);
            })
            .catch(err => console.log(err));
    }


    return (
        <div className="delete-post-container">
            <p>Are you sure to delete this post?</p>
            <div className="delete-post-btns">
                <button className="yes-btn" onClick={() => deletePost()}>Yes</button>
                <button className="no-btn" onClick={() => closeModal()}>No</button>
            </div>
        </div>

    )
}

export default PostOptions;