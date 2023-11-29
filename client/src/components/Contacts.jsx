import { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/react.svg";
// eslint-disable-next-line react/prop-types
export default function Contacts({ contacts, currentUser }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    console.log(contacts);
    if (currentUser) {
      // eslint-disable-next-line react/prop-types
      setCurrentUserName(currentUser.username);
      // eslint-disable-next-line react/prop-types
      setCurrentUserImage(currentUser.avatarImage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);
  const changeCurrentChat = (index, contact) => {};
  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>EXpressTalks</h3>
          </div>
          <div className="contacts">
            {
              // eslint-disable-next-line react/prop-types
              contacts.map((contact, index) => {
                return (
                  <div
                    className={`contact ${
                      index === currentSelected ? "selected" : " "
                    }`}
                    key={contact._id}
                  >
                    <div className="avatar">
                      <img
                        src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                        alt="avatar"
                      />
                    </div>
                    <div className="username">
                      <h3>{contact.username}</h3>
                    </div>
                  </div>
                );
              })
            }
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                // eslint-disable-next-line react/prop-types
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h1>{currentUserName}</h1>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    overflow: auto;
    align-items: center;
    gap: 0.8rem;
    .contact {
      background-color: #ffffff39;
    }
  }
`;
