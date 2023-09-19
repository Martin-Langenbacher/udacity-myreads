import { Link } from "react-router-dom";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { search } from "./BooksAPI";
// import { getAll } from "./BooksAPI";
import Book from "./Book";

const SearchPage = ({ addThisBook, shelfs }) => {
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState();
  const [foundResult, setfoundResult] = useState(false);

  const onChangeBookShelf = (bookWhichWillChange) => {
    const newShelfForTheBook = {
      id: bookWhichWillChange.id,
      backgroundImage: bookWhichWillChange.backgroundImage,
      bookTitle: bookWhichWillChange.bookTitle,
      author: bookWhichWillChange.author,
      shelf: bookWhichWillChange.shelf,
    };
    addThisBook(newShelfForTheBook);
  };

  useEffect(() => {
    console.log("SearchString: ", `>>>${searchString}<<<`);
    if (searchString === "") {
      setfoundResult(false);
      return;
    }

    search(searchString, 10)
      .then((res) => {
        let newArrayResult = [];

        if (res?.items?.length === 0) {
          setSearchResults([]);
          setfoundResult(false);
        } else {
          setfoundResult(true);
          res?.forEach((element) => {
            const author =
              element.authors && element.authors.length > 0
                ? // alt: ? element.authors[0]
                  element.authors
                : "Unknown";

            const urlForPic = `url("${element.imageLinks?.smallThumbnail}")`;
            const newSearchElement = {
              id: element.id,
              backgroundImage: urlForPic,
              bookTitle: element.title,
              author: author,
              shelf: "none",
            };
            newArrayResult.push(newSearchElement);
          });
          setSearchResults(newArrayResult);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [searchString]);

  const handleChange = (e) => {
    e.preventDefault();
    const inputValue = e.target.value;
    setSearchString(inputValue);
  };

  return (
    <div className="search-books">
      <Header />
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          {/* <form onSubmit={submitSearch}> */}
          <form>
            <input
              id="searchString"
              type="text"
              value={searchString}
              placeholder="Search by title, author, or ISBN"
              onChange={handleChange}
            />
            {/* <button type="submit">Submit</button> */}
          </form>
        </div>
      </div>
      {foundResult && (
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResults?.map((book) => {
              return (
                <Book
                  key={book.id}
                  book={book}
                  onBookChange={onChangeBookShelf}
                  shelfs={shelfs}
                />
              );
            })}
          </ol>
        </div>
      )}
      {!foundResult && <p>No result found for ' {searchString} ' </p>}
      <div className="search-button-back">
        <Link to="/">
          <button>Go back to Home</button>
        </Link>
      </div>
    </div>
  );
};

SearchPage.propTypes = {
  addThisBook: PropTypes.func.isRequired,
  shelfs: PropTypes.array.isRequired,
};

export default SearchPage;
