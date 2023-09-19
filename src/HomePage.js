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
      {shelfs.map((shelf) => {
        return (
          shelf.shelfname !== "none" && (
            <Shelf
              key={shelf.shelfname}
              shelf={shelf}
              books={books}
              bookShelfHasChanged={bookShelfHasChanged}
              shelfs={shelfs}
            />
          )
        );
      })}
      <div className="search-button-back">
        <Link to="/experiments">
          <button>Experiment Button: Drag-and-Drop</button>
        </Link>
      </div>
      <div className="search-button-back">
        <Link to="/draganddrop">
          <button>Drag-and-Drop - Test</button>
        </Link>
      </div>
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
