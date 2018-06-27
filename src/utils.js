import * as d3 from "d3";

/*
  There is no relationship between the number of books of a given genre, and
  the number of books of other genres (e.g. a single person could buy 1 Satire
  book and: 10 Science Fiction books + 2 Drama books, etc...).
*/
const rowFunction = d => {
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

export async function loadDataset() {
  const urlDataset = "../data/book_genres.tsv";
  // const urlDataset = "https://github.com/jackdbd/d3-visualizations/blob/master/src/data/book_genres.tsv";
  // const urlDataset = "https://s3.eu-central-1.amazonaws.com/dataviz-challenge-munich-giacomo-debidda/data/book_genres.tsv";
  let dataset;
  try {
    dataset = await d3.tsv(urlDataset, rowFunction);
  } catch (error) {
    throw error;
  }
  return dataset;
}

export function getStaticData(dataset) {
  const data = dataset.map(d => {
    const obj = { genre: d.genre, customers: d[d.genre] };
    return obj;
  });
  // sort in ascending order (in place)
  data.sort((a, b) => d3.ascending(a.customers, b.customers));
  // const genres = data.map(d => d.genre);
  // const genre1 = genres[genres.length - 1];
  // const genre2 = genres[genres.length - 2];
  // const genre3 = genres[genres.length - 3];
  return data;
}

export function getDynamicData(dataset) {}

export function getComparisonData(dataset) {}
