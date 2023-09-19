// import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

import "./App.css";
//import { BOOKS } from "./experiments/DragAndDropBooks";
import SearchPage from "./SearchPage";
import DragAndDrop from "./experiments/DragAndDrop";
import DragAndDropBooks from "./experiments/DragAndDropBooks";
import HomePage from "./HomePage";
import BookDetailPage from "./BookDetailPage";
import { getAll } from "./BooksAPI";

const SHELFS = [
  { shelfname: "currentlyReading", title: "Currently Reading" },
  { shelfname: "wantToRead", title: "Want to Read" },
  { shelfname: "read", title: "Read" },
  { shelfname: "none", title: "None" },
];

function App() {
  // const [books, setBooks] = useState(BOOKS);
  const [books, setBooks] = useState([]);
  const handleBooksDataChange = (newBook) => {
    const booksAfterChange = books.map((book) =>
      book.id === newBook.id ? newBook : book
    );
    setBooks(booksAfterChange);
  };

  const bookAddedFromSearchPage = (bookToAdd) => {
    const newArrayOfBooks = [...books, bookToAdd];
    setBooks(newArrayOfBooks);
  };

  // This is the code for the getAll-function
  useEffect(() => {
    let mounted = true;

    if (books.length === 0) {
      getAll()
        .then((res) => {
          const newArrayResult = [];
          res.forEach((element) => {
            const urlForPic = `url("${element.imageLinks.smallThumbnail}")`;
            const newLoadElement = {
              id: element.id,
              backgroundImage: urlForPic,
              bookTitle: element.title,
              author: element.authors,
              shelf: element.shelf,
            };
            newArrayResult.push(newLoadElement);
            //setSearchResults(newArrayResult);  // --> Wrong place !!!
          });

          if (mounted) {
            setBooks(newArrayResult);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

      return () => {
        mounted = false;
      };
    }
  }, [books]);

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <HomePage
            shelfs={SHELFS}
            books={books}
            onBooksDataChange={handleBooksDataChange}
          />
        }
      />
      <Route
        path="search"
        element={
          <SearchPage addThisBook={bookAddedFromSearchPage} shelfs={SHELFS} />
        }
      />
      <Route
        path="book/:id"
        element={
          <BookDetailPage
            addThisBook={bookAddedFromSearchPage}
            onBooksDataChange={handleBooksDataChange}
            books={books}
            shelfs={SHELFS}
          />
        }
      />
      <Route path="experiments" element={<DragAndDrop />} />
      <Route path="draganddrop" element={<DragAndDropBooks />} />
    </Routes>
  );
}

export default App;
