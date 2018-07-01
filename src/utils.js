import { ascending, descending } from "d3-array";
import { tsv } from "d3-fetch";

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
  // const urlDataset = "../data/book_genres.tsv";
  const urlDataset = "https://raw.githubusercontent.com/jackdbd/dataviz-challenge-munich/master/data/book_genres.tsv"
  let dataset;
  try {
    dataset = await tsv(urlDataset, rowFunction);
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
  data.sort((a, b) => ascending(a.customers, b.customers));
  return data;
}

export function getDynamicData(dataset, genre) {
  const obj = dataset.filter(d => d.genre === genre)[0];
  const entries = Object.entries(obj).filter(
    d => d[0] !== "genre" && d[0] !== genre
  );
  const data = entries.map(d => ({ genre: d[0], customers: d[1] }));
  data.sort((a, b) => ascending(a.customers, b.customers));
  // const genres = data.map(d => d.genre);
  // const genre1 = genres[genres.length - 1];
  // const genre2 = genres[genres.length - 2];
  // const genre3 = genres[genres.length - 3];
  return data;
}

// TODO: double-check what to return
export function getComparisonData(dataset, genre) {
  const objGenre = dataset.filter(d => d.genre === genre)[0];
  const objectsOtherGenres = dataset.filter(d => d.genre !== genre);
  const genres = objectsOtherGenres.map(d => d.genre);

  /*
    'genre' is the genre we are interested in analyzing (e.g. Art) across all
    genres. 'otherGenre' is the current genre we are comparing with 'genre'.
    E.g. Art is 'genre', and 'otherGenre' is 'Science'.
    We are interested in 2 ratios (or percentages):
    1) ratioRight: % of customers who bought at least 1 'genre' book (e.g. Art),
      GIVEN that they bought at least one 'otherGenre' book (e.g. Science);
    2) ratioLeft: % of customers who bought at least 1 'otherGenre' book (e.g.
      Science), GIVEN that they bought at least one 'genre' book (e.g. Art).
  */
  const data = genres.map(otherGenre => {
    const objOtherGenre = dataset.filter(d => d.genre === otherGenre)[0];
    const ratioRight = objOtherGenre[genre] / objOtherGenre[otherGenre];
    const ratioLeft = objGenre[otherGenre] / objGenre[genre];
    return {
      genre: otherGenre,
      ratioRight,
      ratioLeft
    };
  });

  // sort alphabetically (in place)
  genres.sort((a, b) => descending(a, b));
  return data;
}
