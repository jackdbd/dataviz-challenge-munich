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
    console.log("componentDidMount");
    const urlDataset = "../data/book_genres.tsv";
    // const urlDataset = "https://github.com/jackdbd/d3-visualizations/blob/master/src/data/book_genres.tsv";
    // const urlDataset = "https://s3.eu-central-1.amazonaws.com/dataviz-challenge-munich-giacomo-debidda/data/book_genres.tsv";
    const promise = d3.tsv(urlDataset, rowFunction);
    promise
      .then(dataset => {
        console.log(dataset);
      })
      .catch(error => {
        throw error;
      });
  }
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
