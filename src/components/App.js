import React, { Component } from "react";
import * as d3 from "d3";
import styled from "styled-components";
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

const outerWidth = 1300;
const outerHeight = 600;
const margin = { top: 0, right: 30, bottom: 20, left: 50 };

const rowFunction = d => {
  /*
    There is no relationship between the number of books of a given genre, and
    the number of books of other genres (e.g. a single person could buy 1 Satire
    book and: 10 Science Fiction books + 2 Drama books, etc...).
  */
  const genre = d[""];
  const obj = {
    genre
  };
  const entries = Object.entries(d).filter(e => e[0] !== "");
  entries.forEach(e => {
    const otherGenre = e[0];
    const numBooks = +e[1];
    obj[otherGenre] = numBooks;
  });
  return obj;
};

class App extends Component {
  componentDidMount() {
    console.log("<App> componentDidMount");
    // const urlDataset = "../data/book_genres.tsv";
    // const urlDataset = "https://github.com/jackdbd/d3-visualizations/blob/master/src/data/book_genres.tsv";
    // const urlDataset = "https://s3.eu-central-1.amazonaws.com/dataviz-challenge-munich-giacomo-debidda/data/book_genres.tsv";
    // const promise = d3.tsv(urlDataset, rowFunction);
    // promise
    //   .then(dataset => {
    //     console.log(dataset);
    //   })
    //   .catch(error => {
    //     throw error;
    //   });
  }
  render() {
    return (
      <Container>
        <Header text={"Dataviz Challenge"} />
        <Content>
          <Viz outerWidth={200} outerHeight={100} margin={margin} />
          <Viz outerWidth={400} outerHeight={200} />
        </Content>
        <Footer />
      </Container>
    );
  }
}

export default App;
