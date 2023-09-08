import { Link } from "react-router-dom";
import Header from "./components/Header";
import { useState, useEffect } from "react";

import { getAll } from "./BooksAPI";
import Book from "./Book";

const SearchPage = () => {
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState();

  const onChangeBook = () => {
    console.log("Continue WORKING HERE ---> in case of change...");
  };

  useEffect(() => {
    getAll()
      .then((res) => {
        const newArrayResult = [];
        res.forEach((element) => {
          const urlForPic = `url("${element.imageLinks.smallThumbnail}")`;
          const newSearchElement = {
            id: Math.random(),
            backgroundImage: urlForPic,
            bookTitle: element.title,
            author: element.authors[0],
            shelf: "none",
          };
          newArrayResult.push(newSearchElement);
          //setSearchResults(newArrayResult);  // --> Wrong place !!!
        });
        setSearchResults(newArrayResult);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const submitSearch = (textInSubmit) => {
    textInSubmit.preventDefault();
    console.log("textInSubmit", textInSubmit.target.value);
  };

  const handleChange = (e) => {
    e.preventDefault();

    const inputValue = e.target.value;
    console.log("in handle Change: ", inputValue);
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
          <form onSubmit={submitSearch}>
            <input
              id="searchString"
              type="text"
              value={searchString}
              placeholder="Search by title, author, or ISBN"
              onChange={handleChange}
            />
          </form>
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchResults?.map((book) => {
            return (
              <Book key={book.id} book={book} onBookChange={onChangeBook} />
            );
          })}
        </ol>
      </div>
      <div className="search-button-back">
        <Link to="/">
          <button>Go back to Home</button>
        </Link>
      </div>
      <div className="search-button-back">
        <button type="submit">Submit</button>
      </div>
    </div>
  );
};

export default SearchPage;
