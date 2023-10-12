import { Link } from "react-router-dom";
import "./styles/Post.css";
import LazyLoad from 'react-lazy-load';
import Comment from "./Comment";
import { UserPostsContext } from "./UserContext";
import { useContext } from "react";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { getTime, getDate } from '../utility/format';

const UserPosts = () => {

    const userId = localStorage.getItem('id');
    const userPosts = useContext(UserPostsContext);

    const profileLinkStyle = {
        width: "auto",
        textDecoration: "none"

    }

    
    return (
        <ul className="posts-list">
            <p className="userposts-text">User posts</p>
            {

                userPosts?.length > 0 ? (
                    userPosts.map(function (post) {

                        return (
                            <LazyLoad key={post._id}>

                                <li className="post-item" key={post._id}>

                                    <div className="link-container">
                                        <Link to={`/profile/${post["user"]._id}`} style={profileLinkStyle}>
                                            <img className="post-user--photo" alt={post["user"].username} src={post["user"].profileImg} />
                                            <span className="post-username">{post["user"].username}</span>
                                        </Link>
                                    </div>
                                    <span className="post-date">
                                        {getDate(post.createdAt)}
                                    </span>
                                    <span className="post-time">
                                        {getTime(post.createdAt)}
                                    </span>
                                    <p className="post-content">{post.postContent}</p>
                                    {
                                        post.postImage && (
                                            <div className="post-image-container">
                                                <img className="post-image" src={post.postImage} alt="post img" />
                                            </div>
                                        )

                                    }
                                    <Comment postId={post._id} userId={userId} />
                                </li>
                            </LazyLoad>

                        )
                    }
                    )

                ) : (
                    <Stack spacing={1}>
                        <Skeleton animation="wave" variant="circular" width={50} height={50} />
                        <Skeleton animation="wave" variant="h1" style={{ width: "100%", height: "300px" }} />
                        <Skeleton animation="wave" variant="h1" style={{ width: "100%", height: "100px" }} />
                    </Stack>)
            }



        </ul>

    )
}

export default UserPosts;