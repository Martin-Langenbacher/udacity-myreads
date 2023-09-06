import { Link } from "react-router-dom";

import BookShelfChanger from "./BookShelfChanger";

const Book = ({ book }) => {
  const handleClick = () => {
    console.log("Click");
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
          ></Link>
          <BookShelfChanger />
        </div>
        <div className="book-title">{book.bookTitle}</div>
        <div className="book-authors">{book.author}</div>
      </div>
    </li>
  );
};

export default Book;
