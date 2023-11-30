import React from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
export default function Wellcome({ currentUser }) {
  return (
    <Containter>
      <img src={Robot} alt="robot" />
      <h1>
        Wellcome, <span>{currentUser.username}!</span>
      </h1>
      <h3>Please select a chat to Start messaging</h3>
    </Containter>
  );
}

const Containter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  img {
    height: 20rem;
  }
  span {
    color: #4e00ff;
  }
`;
