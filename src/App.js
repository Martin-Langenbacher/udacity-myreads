// import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import "./App.css";
//import { BOOKS } from "./experiments/DragAndDropBooks";
import SearchPage from "./SearchPage";
import DragAndDrop from "./experiments/DragAndDrop";
import DragAndDropBooks from "./experiments/DragAndDropBooks";
import HomePage from "./HomePage";
import BookDetailPage from "./BookDetailPage";
import { useState } from "react";


const SHELFS = [
  { shelfname: "currentlyReading", title: "Currently Reading" },
  { shelfname: "wantToRead", title: "Want to Read" },
  { shelfname: "read", title: "Read" },
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
        element={<SearchPage addThisBook={bookAddedFromSearchPage} />}
      />
      <Route
        path="book/:id"
        element={
          <BookDetailPage
            addThisBook={bookAddedFromSearchPage}
            onBooksDataChange={handleBooksDataChange}
            books={books}
          />
        }
      />
      <Route path="experiments" element={<DragAndDrop />} />
      <Route path="draganddrop" element={<DragAndDropBooks />} />
    </Routes>
  );
}

export default App;
