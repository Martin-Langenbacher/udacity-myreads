const Book = ({ book }) => {
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: book.styleWidth,
              height: book.styleHeight,
              backgroundImage: book.backgroundImage,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select>
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.bookTitle}</div>
        <div className="book-authors">{book.author}</div>
      </div>
    </li>
  );
};

export default Book;
