import React, { Component } from "react";
import * as d3 from "d3";
import styled from "styled-components";
import { loadDataset, getStaticData } from "../utils";
import Header from "./Header";
import Footer from "./Footer";
import Viz from "./Viz";

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

const outerWidth = 500;
const outerHeight = 300;
const margin = { top: 20, right: 30, bottom: 20, left: 150 };

class App extends Component {
  state = {
    dataset: [],
    staticData: [],
    genres: [],
    selectedGenre: "Satire"
  };
  async componentDidMount() {
    const dataset = await loadDataset();
    // console.log("App", dataset, this.state.selectedGenre)
    const staticData = getStaticData(dataset);
    // console.log("App", staticData)
    this.setState({ dataset, staticData });
  }
  // <Viz outerWidth={200} outerHeight={100} margin={margin} />
  render() {
    return (
      <Container>
        <Header text={"Dataviz Challenge"} />
        {this.state.dataset.length < 1 ? (
          <Content>Loading</Content>
        ) : (
          <Content>
            <Viz
              data={this.state.staticData}
              outerWidth={outerWidth}
              outerHeight={outerHeight}
              margin={margin}
            />
          </Content>
        )}
        <Footer />
      </Container>
    );
  }
}

export default App;
