import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../components/styles/Message.css";



const Message = () => {
    const sender_id = localStorage.getItem("id");
    const [convos, setConvos] = useState(null);
    const [otherParti, setOtherParti] = useState(null);

    useEffect(() => {
        fetchConversations();
    }, []);

    const fetchConversations = () => {

        axios.get("/fetch-convos/" + sender_id)
            .then((response) => {
                setConvos(response.data);
            })

    }
    return (
        <div className="message-container">
            <h1>Messages</h1>
            <ul className="convos-list">
                {
                    convos?.length > 0 && (

                        convos.map((convo) => {

                            return (
                                <li className="convo-item" key={convo._id}>
                                    {
                                        convo['participants'].filter((parti) => {

                                            return parti._id != sender_id;
                                        })
                                            .map((parti) => {

                                                return (
                                                    <Link style={{ color: "#ffffff", display: "block", textDecoration: "none", width: "100%" }} to={`/convo/${convo._id}`} key={parti._id} state={{ otherId: parti._id, otherImg: parti.profileImg, otherUsername: parti.username }}>
                                                        <span>
                                                            <img className="convo-receiver-photo" src={parti.profileImg} />
                                                            <span>{parti.username}</span>
                                                        </span>
                                                    </Link>

                                                )
                                            })
                                    }
                                    <p></p>
                                </li>



                            )
                        })


                    )
                }
            </ul>
        </div >
    )
}


export default Message;