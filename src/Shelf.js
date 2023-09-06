import Book from "./Book";

const Shelf = ({ shelf, books }) => {
  return (
    <div className="list-books-content">
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{shelf.title}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books.map((book) => {
                const bookInThisShelf = shelf.shelfname === book.shelf;
                return (
                  bookInThisShelf && <Book key={book.bookTitle} book={book} />
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shelf;
