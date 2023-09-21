import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import BookShelfChanger from "./BookShelfChanger";

const Book = ({ book, onBookChange, shelfs }) => {
  // good comment from review:
  // It seems redundant to have a click handler (handleClick) on the Book component. If you're just logging
  // the book details for debugging, remember to remove it in the final code. Otherwise, it might confuse
  // other developers or yourself later.
  const handleClick = () => {
    console.log("Click navigates via 'to' already to the detail page", book);
  };

  const handleShelfChange = (shelfName, shelfs) => {
    const newBook = { ...book, shelf: shelfName };
    onBookChange(newBook);
  };

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <Link
            className="book-cover"
            onClick={handleClick}
            to={`/book/${book.id}`}
            style={{
              width: 128,
              height: 192,
              backgroundImage: book.backgroundImage,
            }}
          />
          <BookShelfChanger
            onShelfChange={handleShelfChange}
            shelfs={shelfs}
            book={book}
          />
        </div>
        <div className="book-title">{book.bookTitle}</div>
        <div className="book-authors">{book.author}</div>
      </div>
    </li>
  );
};

Book.propTypes = {
  // key: PropTypes.string.isRequired,
  book: PropTypes.object.isRequired,
  shelf: PropTypes.string,
  onBookChange: PropTypes.func.isRequired,
  shelfs: PropTypes.array.isRequired,
};

export default Book;
