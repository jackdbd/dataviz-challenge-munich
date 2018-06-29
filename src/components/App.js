import React, { Component } from "react";
import styled from "styled-components";
import {
  loadDataset,
  getStaticData,
  getDynamicData,
  getComparisonData
} from "../utils";
import Header from "./Header";
import Footer from "./Footer";
import { ResponsiveChart, ResponsiveComparisonChart } from "./Chart";

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: "Lobster", cursive;
`;

const FlexContent = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: auto;
`;

const GridContainer = styled.div`
  display: grid;
  margin-top: 10px;
  margin-bottom: 10px;
  /* we define an explicit grid for just one grid item */
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: 1fr;
  /*
    the implicit grid will keep the same number of columns, but we have to
    specify to height of each row with grid-auto-rows
  */
  grid-auto-rows: 1fr;
  grid-gap: 10px;
  /* fit the FlexContent's height */
  min-height: 100vh;
`;

class App extends Component {
  state = {
    dataset: [],
    staticData: [],
    dynamicData: [],
    comparisonData: [],
    selectedGenre: "Satire",
    accessorsStaticChart: {
      x: d => d.customers,
      y: d => d.genre,
      z: d => d.genre
    },
    accessorsDynamicChart: {
      x: d => d.customers,
      y: d => d.genre,
      z: d => d.genre
    },
    accessorsComparisonChart: {
      xLeft: d => d.ratioLeft,
      xRight: d => d.ratioRight,
      y: d => d.genre,
      z: d => d.genre
    }
  };

  async componentDidMount() {
    const dataset = await loadDataset();
    const staticData = getStaticData(dataset);
    const dynamicData = getDynamicData(dataset, this.state.selectedGenre);
    const comparisonData = getComparisonData(dataset, this.state.selectedGenre);
    this.setState({ dataset, staticData, dynamicData, comparisonData });
  }
  render() {
    return (
      <FlexContainer>
        <Header text={"Dataviz Challenge"} />
        {this.state.dataset.length < 1 ? (
          <FlexContent>Loading</FlexContent>
        ) : (
          <FlexContent>
            <GridContainer>
              <ResponsiveChart
                margin={{ top: 40, right: 100, bottom: 60, left: 300 }}
                data={this.state.staticData}
                accessors={this.state.accessorsStaticChart}
                axisFormatSpecifiers={{ x: "~s" }}
              />
              {/*
              <ResponsiveChart
                data={this.state.dynamicData}
                accessors={this.state.accessorsDynamicChart}
                viewBox={"0 0 2000 500"}
                showDebug
              />
              */}
              <ResponsiveComparisonChart
                margin={{ top: 40, right: 100, bottom: 60, left: 300 }}
                data={this.state.comparisonData}
                accessors={this.state.accessorsComparisonChart}
                axisFormatSpecifiers={{ xLeft: ".0%", xRight: ".0%" }}
              />
            </GridContainer>
          </FlexContent>
        )}
        <Footer />
      </FlexContainer>
    );
  }
}

export default App;

/* 
<ResponsiveChart data={this.state.staticData} viewBox={"0 0 1000 2000"} />
<ResponsiveChart data={[]} viewBox={"0 0 200 200"} />
*/
