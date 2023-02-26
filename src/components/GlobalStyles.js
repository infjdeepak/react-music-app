import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
}

*::-webkit-scrollbar {
  width: 5px;
}
*::-webkit-scrollbar-track {
  background: transparent;
}
*::-webkit-scrollbar-thumb {
  background: transparent;
  background-color: rgba(155, 155, 155, 0.5);
}

html {
  font-size: 62.5%;
  @media screen and (max-width: 950px) {
    font-size: 53%;
}
  @media screen and (max-width: 700px) {
    font-size: 45%;
}
}
body {
  font-family: "Lato", sans-serif;
}
h1 {
  font-size: 4rem;
}
h2 {
  font-size: 3.5rem;
}
h3 {
  font-size: 3rem;
}
h4,
h5 {
  font-size: 2.5rem;
}
h1,
h2,
h5 {
  color: rgb(41, 40, 40);
}
h3,
h4 {
  font-weight: 400;
  color: rgb(100, 100, 100);
}
p,
span,
input,
a,
button {
  font-size: 2rem;
}
`;

export default GlobalStyles;
