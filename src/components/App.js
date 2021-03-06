import React, { Component } from "react";
import { max, descending } from "d3-array";
import { scaleLinear, scaleBand, scaleOrdinal } from "d3-scale";
import styled from "styled-components";
import {
  loadDataset,
  getStaticData,
  getDynamicData,
  getComparisonData
} from "../utils";
import Header from "./Header";
import Footer from "./Footer";
import Description from "./Description";
import { ResponsiveBarChart, ResponsiveComparisonBarChart } from "./Chart";
import { FooterStatic, FooterDynamic, FooterComparison } from "./FooterChart";

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: ${props => props.fontFamily};
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
  height: 200px;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.handleMouseOver = this.handleMouseOver.bind(this);
  }
  state = {
    /*
      We load the original dataset and compute the data for the "static" bar
      chart only once, when <App> is mounted.
    */
    dataset: [],
    staticData: [],
    /*
      genres have to be sorted in the same way and have the same entries across
      all charts, otherwise the colorscale will differ across the charts.
    */
    genres: [],
    // We need to recompute the charts every time selectedGenre changes
    selectedGenre: "Satire",
    /*
      We need to recompute the data for the "dynamic" bar chart and the
      comparison chart every time the selected genre changes. These pieces of
      state are here because otherwise these charts would be data-specific.
    */
    dynamicData: [],
    comparisonData: [],
    /*
      We create accessor functions here so the chart components down in the
      hierarchy can be "dumb" and generic.
    */
    accessors: {
      x: d => d.customers,
      y: d => d.genre,
      z: d => d.genre
    },
    accessorsComparison: {
      xLeft: d => d.ratioLeft,
      xRight: d => d.ratioRight,
      y: d => d.genre,
      z: d => d.genre
    }
  };

  /*
    The scales for the x/y axes depend on the data and the chart dimensions.
    We can avoid re-defining the scale domain in the chart's render, because it
    doesn't change if the data stay the same. We can update the scale domain
    here, and let the chart's render take care of re-defining just the scale's
    range.
    Note: even if the "static" bar chart and the "dynamic" bar chart use the
    same accessor functions, their scale are different because the data is
    different.
  */
  updateStaticScalesDomains(data) {
    const xScaleStatic = scaleLinear().domain([
      0,
      max(data.map(this.state.accessors.x))
    ]);
    const yScaleStatic = scaleBand().domain(data.map(this.state.accessors.y));
    return { xScaleStatic, yScaleStatic };
  }

  updateDynamicScalesDomains(data) {
    const xScaleDynamic = scaleLinear().domain([
      0,
      max(data.map(this.state.accessors.x))
    ]);
    const yScaleDynamic = scaleBand().domain(data.map(this.state.accessors.y));
    return { xScaleDynamic, yScaleDynamic };
  }

  updateComparisonScalesDomains(data) {
    const maxPercentage = max([
      max(data.map(this.state.accessorsComparison.xLeft)),
      max(data.map(this.state.accessorsComparison.xRight))
    ]);
    const xScaleComparisonLeft = scaleLinear().domain([0, maxPercentage]);
    const xScaleComparisonRight = scaleLinear().domain([maxPercentage, 0]);
    const yScaleComparison = scaleBand().domain(
      data.map(this.state.accessorsComparison.y)
    );
    return { xScaleComparisonLeft, xScaleComparisonRight, yScaleComparison };
  }

  handleMouseOver(event, d) {
    const selectedGenre = d.y;
    const dataset = this.state.dataset;
    const dynamicData = getDynamicData(dataset, selectedGenre);
    const comparisonData = getComparisonData(dataset, selectedGenre);
    const selectedObj = dataset.filter(d => d.genre === selectedGenre)[0];
    /*
      When we hover on a bar we select a new genre, so the domain of the dynamic
      bar chart and the comparison chart changes. The domain of the static chart
      doesn't change, so we don't need to update the domain of its scales.
    */
    const { xScaleDynamic, yScaleDynamic } = this.updateDynamicScalesDomains(
      dynamicData
    );
    const {
      xScaleComparisonLeft,
      xScaleComparisonRight,
      yScaleComparison
    } = this.updateComparisonScalesDomains(comparisonData);
    this.setState({
      selectedGenre,
      dynamicData,
      comparisonData,
      selectedObj,
      xScaleDynamic,
      yScaleDynamic,
      xScaleComparisonLeft,
      xScaleComparisonRight,
      yScaleComparison
    });
  }

  async componentDidMount() {
    // Data
    const dataset = await loadDataset();
    const selectedGenre = this.state.selectedGenre;
    const genres = dataset.map(d => d.genre).sort((a, b) => descending(a, b));
    const staticData = getStaticData(dataset);
    const dynamicData = getDynamicData(dataset, selectedGenre);
    const comparisonData = getComparisonData(dataset, selectedGenre);
    const selectedObj = dataset.filter(d => d.genre === selectedGenre)[0];
    // Scales
    // The color scale doesn't change across the charts
    // http://colorbrewer2.org/?type=qualitative&scheme=Paired&n=10
    const zScale = scaleOrdinal()
      .domain(genres)
      .range([
        "#a6cee3",
        "#1f78b4",
        "#b2df8a",
        "#33a02c",
        "#fb9a99",
        "#e31a1c",
        "#fdbf6f",
        "#ff7f00",
        "#cab2d6",
        "#6a3d9a"
      ]);
    const { xScaleStatic, yScaleStatic } = this.updateStaticScalesDomains(
      staticData
    );
    const { xScaleDynamic, yScaleDynamic } = this.updateDynamicScalesDomains(
      dynamicData
    );
    const {
      xScaleComparisonLeft,
      xScaleComparisonRight,
      yScaleComparison
    } = this.updateComparisonScalesDomains(comparisonData);
    this.setState({
      dataset,
      staticData,
      dynamicData,
      comparisonData,
      genres,
      selectedGenre,
      selectedObj,
      zScale,
      xScaleStatic,
      yScaleStatic,
      xScaleDynamic,
      yScaleDynamic,
      xScaleComparisonLeft,
      xScaleComparisonRight,
      yScaleComparison
    });
  }
  render() {
    const staticScales = {
      x: this.state.xScaleStatic,
      y: this.state.yScaleStatic,
      z: this.state.zScale
    };
    const dynamicScales = {
      x: this.state.xScaleDynamic,
      y: this.state.yScaleDynamic,
      z: this.state.zScale
    };
    const comparisonScales = {
      xLeft: this.state.xScaleComparisonLeft,
      xRight: this.state.xScaleComparisonRight,
      y: this.state.yScaleComparison,
      z: this.state.zScale
    };
    return (
      <FlexContainer fontFamily={"Kalam"}>
        <Header text={"Dataviz Challenge Munich"} backgroundColor={"#ff7f00"} />
        {this.state.dataset.length < 1 ? (
          <FlexContent>Loading</FlexContent>
        ) : (
          <FlexContent>
            <div>
              <Description />
              <ResponsiveBarChart
                height={600}
                margin={{ top: 10, right: 45, bottom: 50, left: 240 }}
                data={this.state.staticData}
                scales={staticScales}
                accessors={this.state.accessors}
                axisFormatSpecifiers={{ x: "~s" }}
                handleMouseOver={this.handleMouseOver}
              />
              <FooterStatic
                data={this.state.staticData}
                accessor={this.state.accessors.y}
                colorScale={this.state.zScale}
                backgroundColor={"#d3d3d3"}
              />
            </div>
            <div>
              <Header
                text={`${this.state.selectedGenre}`}
                backgroundColor={this.state.zScale(this.state.selectedGenre)}
              />
              <ResponsiveBarChart
                height={600}
                margin={{ top: 10, right: 45, bottom: 50, left: 240 }}
                data={this.state.dynamicData}
                scales={dynamicScales}
                accessors={this.state.accessors}
                selected={this.state.selectedGenre}
                // viewBox={"0 0 2000 500"}
                // showDebug
              />
              <FooterDynamic
                obj={this.state.selectedObj}
                data={this.state.dynamicData}
                accessor={this.state.accessors.y}
                colorScale={this.state.zScale}
                backgroundColor={"#d3d3d3"}
              />
            </div>
            <div>
              <Header
                text={`${this.state.selectedGenre} across all genres`}
                backgroundColor={this.state.zScale(this.state.selectedGenre)}
              />
              <ResponsiveComparisonBarChart
                height={600}
                margin={{ top: 10, right: 45, bottom: 30, left: 240 }}
                data={this.state.comparisonData}
                selected={this.state.selectedGenre}
                scales={comparisonScales}
                accessors={this.state.accessorsComparison}
                axisFormatSpecifiers={{ xLeft: ".0%", xRight: ".0%" }}
              />
              <FooterComparison
                genre={this.state.selectedGenre}
                colorScale={this.state.zScale}
                backgroundColor={"#d3d3d3"}
              />
            </div>
          </FlexContent>
        )}
        <Footer backgroundColor={"#ff7f00"} />
      </FlexContainer>
    );
  }
}

export default App;
