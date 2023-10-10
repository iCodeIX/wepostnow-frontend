import { useEffect, useState, useRef } from "react";
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
    const messagesList = useRef(null);


    useEffect(() => {
        fetchMessages();
    }, []);


    useEffect(() => messagesList.current.scrollIntoView(false), [convoMessages]);


    const fetchMessages = () => {

        axios.get("/fetch-convo-messages/" + convo_id)
            .then((response => {
                setConvoMessages(response.data);
            }))
            .catch(err => {
                console.log(err);
            })
    }

    const [userMessage, setUserMessage] = useState({
        sender: userId,
        receiver: otherId,
        message: ""
    });


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
                fetchMessages();
                setUserMessage({
                    ...userMessage,
                    message: ""
                })

            })
            .catch(err =>
                console.log(err)
            );


    }

    const refreshMessages = () => {
        fetchMessages();
    }


    return (
        <div className="convos-container">
            <div className="convos-centered">
                <div className="receiver-divider">
                    <img className="convo-receiver-photo" src={otherImg} />
                    <Link to={`/profile/${otherId}`} style={{ color: "#000000" }}>
                        <span className="convo-receiver-username">
                            {otherUsername}
                        </span>
                    </Link>
                </div>
                <ul className="convo-messages-list" ref={messagesList} >
                    {
                        convoMessages?.length > 0 && (
                            convoMessages.map((message) => {
                                return (
                                    <li className="message-item" key={message._id} ref={messagesList}>

                                        {userId === message.sender ? (<p className="sender-msg">{message.message}</p>) : (<p className="receiver-msg">{message.message}</p>)}

                                    </li>
                                )
                            })
                        )
                    }
                </ul>
                <div className="bottom-btns">
                    <button className="refresh-btn" onClick={() => { refreshMessages() }}>Refresh Convo</button>
                    <form className="convo-message-form" onSubmit={createMessage}>

                        <textarea placeholder="Write a message" value={userMessage.message} onChange={handleMessageChangeForm} />
                        <button type="submit">SEND</button>
                    </form>
                </div>

            </div>

        </div>
    )
}

export default Convo;