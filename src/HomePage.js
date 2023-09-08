import { Link } from "react-router-dom";

import Shelf from "./Shelf";
import Header from "./components/Header";

const HomePage = ({ shelfs, books, onBooksDataChange }) => {
  const bookShelfHasChanged = (newBook) => {
    onBooksDataChange(newBook);
  };

  return (
    <div className="app">
      {/* <div className="list-books"> */}
      <Header />
      {shelfs.map((shelf) => (
        <Shelf
          key={shelf.shelfname}
          shelf={shelf}
          books={books}
          bookShelfHasChanged={bookShelfHasChanged}
        />
      ))}

      <div className="open-search">
        <Link
          to="/search"
          //onClick={() => setShowSearchpage(!showSearchPage)}
        >
          Add a book
        </Link>
      </div>
      {/* </div> */}
    </div>
  );
};

export default HomePage;
