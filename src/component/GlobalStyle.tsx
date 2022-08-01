import {createGlobalStyle} from 'styled-components';

type GlobalStyleProps = {
  'background-color'?: string;
};
const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  html,
  body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-family: "Black Han Sans", sans-serif;
    background-color: ${props => props['background-color'] ?? '#2f2f2f'} ;
    font-size: 2rem;
  }
`;

export default GlobalStyle;
