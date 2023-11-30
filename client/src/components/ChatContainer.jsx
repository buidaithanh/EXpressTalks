import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/ApiRoutes";
export default function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  useEffect(() => {
    async function getAllMsg() {
      if (currentChat) {
        const res = await axios.post(getAllMessagesRoute, {
          // eslint-disable-next-line react/prop-types
          from: currentUser._id,
          // eslint-disable-next-line react/prop-types
          to: currentChat._id,
        });

        setMessages(res.data);
      }
    }
    getAllMsg();
  }, [currentChat]);

  const handleSendMassage = async (msg) => {
    await axios.post(sendMessageRoute, {
      // eslint-disable-next-line react/prop-types
      from: currentUser._id,
      // eslint-disable-next-line react/prop-types
      to: currentChat._id,
      message: msg,
    });
    // eslint-disable-next-line react/prop-types
    socket.current.emit("send-message", {
      // eslint-disable-next-line react/prop-types
      to: currentChat._id,
      // eslint-disable-next-line react/prop-types
      from: currentUser._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };
  useEffect(() => {
    if (socket.current) {
      socket.current.on("message-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  });

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            <Logout />
          </div>
          <div className="chat-messages">
            {messages.map((message, index) => {
              const createdAtDate = new Date(message.createdAt);
              const hours = createdAtDate.getHours();
              const minutes = createdAtDate.getMinutes();
              const formattedDate = `${hours}:${minutes}`;

              return (
                <div ref={scrollRef} key={uuidv4()}>
                  <div
                    className={`message ${
                      message.fromSelf ? "sended" : "recieved"
                    }`}
                  >
                    <div className="content">
                      <p>{message.message}</p>
                      {/* <span className="formattedDate">{formattedDate}</span> */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ChatInput handleSendMassage={handleSendMassage} />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-rows: 10% 78% 12%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-auto-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    overflow: auto;
    gap: 1rem;
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        .formattedDate {
          display: flex;
          padding-top: 0.8rem;
          justify-content: right;
          font-size: 0.6rem;
          color: gray;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #2c3e50;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;
