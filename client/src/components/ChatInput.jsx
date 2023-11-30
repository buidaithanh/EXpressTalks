import { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

export default function ChatInput({ handleSendMassage }) {
  const [showPickEmoji, setShowPickEmoji] = useState(false);
  const [messages, setMessages] = useState("");

  const handleEmojiPickerHideAndShow = () => {
    setShowPickEmoji(!showPickEmoji);
  };
  const handleEmojiClick = (emojiData, e) => {
    console.log(emojiData);
    let msg = messages;
    msg += emojiData.emoji;
    setMessages(msg);
  };
  const sendChat = (e) => {
    e.preventDefault();
    if (messages.length > 0) {
      handleSendMassage(messages);
      setMessages("");
    }
  };
  return (
    <>
      <Container>
        <div className="button-container">
          <div className="emoji">
            <BsEmojiSmileFill onClick={() => handleEmojiPickerHideAndShow()} />
            {showPickEmoji && (
              <Picker
                height={300}
                width={250}
                onEmojiClick={handleEmojiClick}
              />
            )}
          </div>
        </div>
        <form className="input-container" onSubmit={(e) => sendChat(e)}>
          <input
            type="text"
            placeholder="type you massages here"
            value={messages}
            onChange={(e) => setMessages(e.target.value)}
          />
          <button type="submit">
            <IoMdSend />
          </button>
        </form>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #080420;
  padding: 0 2rem;
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.2rem;
        color: yellow;
        cursor: pointer;
      }
      .EmojiPickerReact {
        position: absolute;
        top: -320px;
      }
    }
  }
  .input-container {
    width: 100%;
    display: flex;
    border-radius: 2rem;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      outline: none;
      &::selection {
        background-color: #9186f3;
      }
      &::focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem;
      margin-left: 0.6rem;
      border-radius: 2rem;
      display: flex;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      border: none;
      svg {
        font-size: 2rem;
        color: #ffc312;
      }
    }
  }
`;
