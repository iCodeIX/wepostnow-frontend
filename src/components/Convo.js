import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import "../components/styles/convo.css";


const Convo = () => {
    let { convo_id } = useParams();
    const [convoMessages, setConvoMessages] = useState(null);
    const userId = localStorage.getItem("id");

    const location = useLocation();
    const { otherId, otherImg, otherUsername } = location.state;

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = () => {

        axios.get("/fetch-convo-messages/" + convo_id)
            .then((response => {
                setConvoMessages(response.data);
            }))
            .catch(err => {
                console.log(err);
            })
    }


    return (
        <ul className="convo-messages-list">
            {
                convoMessages?.length > 0 && (
                    convoMessages.map((message, index) => {
                        return (
                            <li key={message._id}>
                                {index === 0 && (
                                    <div className="receiver-divider">
                                        <img className="convo-receiver-photo" src={otherImg} />
                                        <Link to={`/profile/${otherId}`} style={{color:"#000000"}}>
                                            <span className="convo-receiver-username">
                                                {otherUsername}
                                            </span>
                                        </Link>
                                    </div>
                                )}
                                <div className="msgs-list">
                                    {userId === message.sender ? (<p className="sender-msg">{message.message}</p>) : (<p className="receiver-msg">{message.message}</p>)}
                                </div>

                            </li>
                        )
                    })
                )
            }
        </ul >
    )
}

export default Convo;