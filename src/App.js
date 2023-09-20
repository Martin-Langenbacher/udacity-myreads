import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

import "./App.css";
import SearchPage from "./SearchPage";
import DragAndDrop from "./experiments/DragAndDrop";
import DragAndDropBooks from "./experiments/DragAndDropBooks";
import HomePage from "./HomePage";
import BookDetailPage from "./BookDetailPage";
import { getAll, update } from "./BooksAPI";
import NotFoundPage from "./NotFoundPage";

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
    update(newBook, newBook.shelf);
  };

  const bookAddedFromSearchPage = (bookToAdd) => {
    const newArrayOfBooks = [...books, bookToAdd];
    setBooks(newArrayOfBooks);
    update(bookToAdd, bookToAdd.shelf);
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
        exact
        element={
          <SearchPage
            addThisBook={bookAddedFromSearchPage}
            onBooksDataChange={handleBooksDataChange}
            shelfs={SHELFS}
            books={books}
          />
        }
      />
      {/* Question: Not sure how to use it to persist the search query in SearchPage-search */}
      <Route
        path="search/:searchStringId"
        element={
          <SearchPage
            addThisBook={bookAddedFromSearchPage}
            onBooksDataChange={handleBooksDataChange}
            shelfs={SHELFS}
            books={books}
          />
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
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
