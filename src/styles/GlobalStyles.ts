import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;  

  font-family: 'Spoqa Han Sans Neo',-apple-system,'BlinkMacSystemFont','Apple SD Gothic Neo','Inter','Segoe UI',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';
}

#root {
  background-color: #CAE9FF;
}

`;

export default GlobalStyles;
