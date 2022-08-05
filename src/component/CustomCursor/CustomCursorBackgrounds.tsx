/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {createGlobalStyle} from 'styled-components';
import image1 from './image1.jpg';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    background-color: #f1f1f1;
    font-family: monospace;
  }

  .carousel {
    width: 100%;
    height: 60vh;
    border: 1px solid grey;
    box-sizing: border-box;
    margin-bottom: 30px;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  a {
    text-decoration: none;
    color: #333;
    font-size: 1.5rem;
  }
  .email {
    margin-right: 20px; 
  }

  .img-1 {
    width: 100%;
    background-color: #333;
    margin-top: 50px;
  }
`;

const CustomCursorBackgrounds: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <div className="carousel" data-cursor="carousel">
        Carousel
      </div>
      <a href="" className="email" data-cursor="link" data-name="Send Email">
        a92667441@gmail.com
      </a>
      <br />
      <br />
      <br />
      <a href="#" className="address" data-cursor="link" data-name="Show Map">
        강남구 테헤란로
      </a>
      <img src={image1} alt="img" className="img-1" data-cursor="img" />
    </>
  );
};
export default CustomCursorBackgrounds;
