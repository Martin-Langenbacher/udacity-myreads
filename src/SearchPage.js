import { Link } from "react-router-dom";
//import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Header from "./components/Header";
import { search } from "./BooksAPI";
import Book from "./Book";

const SearchPage = ({ addThisBook, shelfs, books, onBooksDataChange }) => {
  //const { searchStringId } = useParams();

  //console.log("SearchPage>>>>>>>>>>>>", searchStringId);

  // TODO:  How to put the search string into the address bar???
  // example - but no idea...
  // onChange={ event => navigate(`/loc/lib/${event.target.value}`) };

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

    if (books.some((book) => book.id === bookWhichWillChange.id)) {
      // Book already exist:
      onBooksDataChange(newShelfForTheBook);
    } else {
      // New book (deep dive via SearchPage)
      addThisBook(newShelfForTheBook);
    }
  };

  useEffect(() => {
    console.log("SearchString: ", `>>>${searchString}<<<`);
    if (searchString === "") {
      setfoundResult(false);
      return;
    }

    const debounce = (callback, waitingTime) => {
      let timer;

      return function (...args) {
        if (timer) {
          clearTimeout(timer);
        }

        timer = setTimeout(() => {
          callback.apply(this, args);
          timer = null;
        }, waitingTime);
      };
    };

    const bookSearch = () => {
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
                  ? element.authors
                  : "Unknown";

              const bookShelfOfBook =
                books.find((book) => book.id === element?.id)?.shelf || "none";

              const urlForPic = `url("${element.imageLinks?.smallThumbnail}")`;
              const newSearchElement = {
                id: element.id,
                backgroundImage: urlForPic,
                bookTitle: element.title,
                author: author,
                shelf: bookShelfOfBook,
              };
              newArrayResult.push(newSearchElement);
            });
            setSearchResults(newArrayResult);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    const debouncedSearch = debounce(bookSearch, 300);
    debouncedSearch(searchString);
  }, [searchString, books]);

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
