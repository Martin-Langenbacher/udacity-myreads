import Book from "./Book";

const Shelf = ({ shelf, books, bookShelfHasChanged }) => {

  const onChangeBook = (newBook) => {
    console.log("newBook >>>>", newBook);
    bookShelfHasChanged(newBook);
  };

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
                  bookInThisShelf && (
                    <Book
                      key={book.id}
                      book={book}
                      shelf={book.shelf}
                      onBookChange={onChangeBook}
                    />
                  )
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
