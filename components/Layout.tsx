import React from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import colours from "../utils/style-utils/colours";


const GlobalStyles = createGlobalStyle`

  * {
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }

  body {
    background: ${colours.lightShades};
    color: ${colours.darkShades};
    font-size: 1rem;
    font-family: Merriweather, serif;
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }

  #__next {
    min-height: 100vh;
  }
`;

const Header = styled.div`
  background: ${colours.darkAccent};
  color: ${colours.lightShades};
  font-size: 2rem;
  font-weight: 100;
  padding-top: 1rem;
  padding-bottom: 1.4rem;
  text-align: center;
  font-family: Barlow;
`;

const Layout = ({ children }: React.PropsWithChildren<{}>) => (
  <ThemeProvider
    theme={{
    }}
  >
    <>
      <Header>
        Bread Calculator
      </Header>
      <GlobalStyles />
      {children}
    </>
  </ThemeProvider>
);

export default Layout;
