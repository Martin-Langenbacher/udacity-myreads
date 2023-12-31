import { useState } from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Note:
//======
// This is a test --> it does not work properly, yet.
// The book cannot be inserted at any position.

// I was not successful to implement it in the excercise.
// I assume that I have to change the structore of the application.

// --> FEEDBACK, welcome!

const DragAndDropBooks = () => {
  const [books, setBooks] = useState(BOOKS);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    console.log("RESULT: ", result);

    if (!destination) return;

    if (
      destination.draggableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let bookToChange;
    let booksList = books;
    bookToChange = booksList[source.index];
    // removes a book at his index, only one
    booksList.splice(source.index, 1);

    // adds a book at the destination.index, but does not delet one,
    // bookToChange is the added book
    booksList.splice(destination.index, 0, bookToChange);

    setBooks(booksList);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <h2>Drag and Drop Example only</h2>
        <Droppable droppableId="dropzone">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <ol className="books-grid">
                {books.map((book, index) => (
                  <Draggable
                    draggableId={book.id.toString()}
                    index={index}
                    key={index}
                  >
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        {/* <li> */}
                        <div className="book" index={index}>
                          <div className="book-top">
                            <Link
                              className="book-cover"
                              to={`/book/${book.id}`}
                              style={{
                                width: 128,
                                height: 192,
                                backgroundImage: book.backgroundImage,
                              }}
                            ></Link>
                          </div>
                          <div className="book-title">{book.bookTitle}</div>
                          <div className="book-authors">{book.author}</div>
                        </div>
                        {/* </li> */}
                      </div>
                    )}
                  </Draggable>
                ))}
              </ol>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
      <div className="search-button-back">
        <Link to="/">
          <button>Go back to Home</button>
        </Link>
      </div>
    </DragDropContext>
  );
};
export default DragAndDropBooks;

// initial books - only used in DragAndDropBooks.js at the moment
export const BOOKS = [
  {
    id: 1,
    backgroundImage:
      'url("http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api")',
    bookTitle: "Ender's Game",
    author: "Orson Scott Card",
    shelf: "currentlyReading",
  },
  {
    id: 2,
    backgroundImage:
      'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")',
    bookTitle: "To Kill a Mockingbird",
    author: "Harper Lee",
    shelf: "currentlyReading",
  },
  {
    id: 3,
    backgroundImage:
      'url("http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api")',
    bookTitle: "1776",
    author: "David McCullough",
    shelf: "wantToRead",
  },
  {
    id: 4,
    backgroundImage:
      'url("http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api")',
    bookTitle: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    shelf: "wantToRead",
  },
  {
    id: 5,
    backgroundImage:
      'url("http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api")',
    bookTitle: "The Hobbit",
    author: "J.R.R. Tolkien",
    shelf: "read",
  },
  {
    id: 6,
    backgroundImage:
      'url("http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api")',
    bookTitle: "Oh, the Places You'll Go!",
    author: "Seuss",
    shelf: "read",
  },
  {
    id: 7,
    backgroundImage:
      'url("http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api")',
    bookTitle: "The Adventures of Tom Sawyer",
    author: "Mark Twain",
    shelf: "read",
  },
];
