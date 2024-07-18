import styled, { keyframes } from "styled-components";
import CODThemeCover from "./assets/cod.jpg";

export const loadingAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

export const scrollAnimation = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-image: url(${CODThemeCover});
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  width: 100%;

  header {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    flex: 1;
  }

  footer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    overflow: hidden;
    position: relative;
    height: 3rem; /* Adjust as needed */

    h1 {
      position: absolute;
      white-space: nowrap;
      animation: ${scrollAnimation} 20s linear infinite;
      margin-left: 1rem;
      span {
        // color: #fe820f;
        margin-right: 1rem;
      }
    }
  }

  .menu {
    display: flex;
    flex: 4;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    ul {
      list-style: none;
      padding: 0;
      margin-top: 20rem;

      li {
      }
    }

    p {
      font-size: 2rem;
      line-height: 1.5;
      transition: color 0.3s;
      &:hover {
        color: #fe820f;
        cursor: pointer;
      }
    }
  }

  .qr-container {
    background-color: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    min-width: 500px;
    min-height: 500px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    p {
      align-items: center;
      margin-top: 1rem;
      color: #fe820f;
      text-align: center;
      animation: ${loadingAnimation} 2s infinite;
    }
  }
`;

export const SignInPromptContainer = styled.div`
  padding: 1rem;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  margin: 0 auto;

  h1 {
    color: white;
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

export const Button = styled.button`
  background-color: #fe820f;
  border: none;
  color: white;
  font-family: inherit;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  cursor: pointer;
  margin-top: 1rem;
`;
