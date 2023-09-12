import { useState } from "react";
import Book from "./Book";

const Shelf = ({ shelf, books, bookShelfHasChanged }) => {
  const [draggedItem, setDraggedItem] = useState(null);

  const onChangeBook = (newBook) => {
    console.log("newBook >>>>", newBook);
    bookShelfHasChanged(newBook);
  };

  const handleDragStart = (event, index) => {
    console.log("dragStarted: ", index);
    //setDraggedItem(book);
    event.dataTransfer.setData("text/plain", ""); // Required for some browsers
  };

  const handleDragOver = (event, book) => {
    event.preventDefault(); // Allow drop
  };

  const handleDrop = (event, book) => {
    event.preventDefault();

    // const newItems = [...items]
    // NewItems.splice(index, 0, draggedItem); // insert the dragged book in the right shelf
    // setItems(NewItems);

    //bookShelfHasChanged(droppedBook);
    setDraggedItem(null);
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
                      draggable={true}
                      onDragStart={(event) => handleDragStart(event, book.id)}
                      onDragOver={(event) => handleDragOver(event, book)}
                      onDrop={(event) => handleDrop(event, book)}
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
