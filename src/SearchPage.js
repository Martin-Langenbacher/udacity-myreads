import { Link } from "react-router-dom";
import Header from "./components/Header";
import { useState, useEffect } from "react";

import { getAll, search } from "./BooksAPI";
import Book from "./Book";

const SearchPage = ({ addThisBook }) => {
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState();

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

    search(searchString, 10)
      .then((res) => {
        let newArrayResult = [];

        if (res?.items?.length === 0) {
          setSearchResults([]);
        } else {
          console.log("else");
          res?.forEach((element) => {
            const author =
              element.authors && element.authors.length > 0
                ? element.authors[0]
                : "Unknown";

            const urlForPic = `url("${element.imageLinks?.smallThumbnail}")`;
            const newSearchElement = {
              id: Math.random(),
              backgroundImage: urlForPic,
              bookTitle: element.title,
              author: author,
              shelf: "none",
            };
            newArrayResult.push(newSearchElement);
          });
          setSearchResults(newArrayResult);
          console.log("New !!!!! newArrayResult", newArrayResult);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [searchString]);

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
      <div className="search-books-results">
        <ol className="books-grid">
          {searchResults?.map((book) => {
            return (
              <Book
                key={book.id}
                book={book}
                onBookChange={onChangeBookShelf}
              />
            );
          })}
        </ol>
      </div>
      <div className="search-button-back">
        <Link to="/">
          <button>Go back to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default SearchPage;

/* Do NOT DELETE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
  */



// OLD Code: =========================================
  /*
  const submitSearch = (event) => {
    event.preventDefault();
    console.log("textInSubmit", searchString);

    searchABook(searchString); // Assuming you have a function to search books

  // Optionally, you can also reset the search input field
  setSearchString('');

  };
  */