import React, { Component } from "react";
import * as d3 from "d3";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";

const Container = styled.div`
  font-family: "Lobster", cursive;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: auto;
`;

class App extends Component {
  render() {
    return (
      <Container>
        <Header text={"Dataviz Challenge"} />
        <Content>
          <div style={{ backgroundColor: "#d3d3d3" }}>
            D3 version {`${d3.version}`}
          </div>
        </Content>
        <Footer />
      </Container>
    );
  }
}

export default App;
