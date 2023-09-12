import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Header from "./components/Header";
import Book from "./Book";
import { get } from "./BooksAPI";

const BookDetailPage = ({ addThisBook, onBooksDataChange, books }) => {
  const [detailBook, setDetailBook] = useState({});
  const [additionalDataToABook, setAdditionalDataToABook] = useState({});
  const { id } = useParams();

  const onChangeBookShelf = (bookWhichWillChange) => {
    const bookFromDetailPage = {
      id: bookWhichWillChange.id,
      backgroundImage: bookWhichWillChange.backgroundImage,
      bookTitle: bookWhichWillChange.bookTitle,
      author: bookWhichWillChange.author,
      shelf: bookWhichWillChange.shelf,
    };

    if (books.some((book) => book.id === bookWhichWillChange.id)) {
      // Book already exist:
      onBooksDataChange(bookFromDetailPage);
    } else {
      // New book (deep dive via SearchPage)
      addThisBook(bookFromDetailPage);
    }
  };

  useEffect(() => {
    get(id)
      .then((res) => {
        const author =
          res.authors && res.authors.length > 0 ? res.authors[0] : "Unknown";

        const detailBookData = {
          id: id,
          backgroundImage: `url("${res.imageLinks?.smallThumbnail}")`,
          bookTitle: res.title,
          author: author,
          shelf: "none",
        };

        const additionalDataToABook = {
          description: res.description,
          categories: res.categories,
          publisher: res.publisher,
          publishedDate: res.publishedDate,
          contentVersion: res.contentVersion,
          biggerBackgroundImage: `url("${res.imageLinks?.thumbnail}")`,
          infoLink: res.infoLink,
          pageCount: res.pageCount,
          language: res.language,
          maturityRating: res.maturityRating,
          printType: res.printType,
          ratingCount: res.ratingCount,
        };
        setDetailBook(detailBookData);
        setAdditionalDataToABook(additionalDataToABook);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  return (
    <>
      <Header />
      <h2>Detailed information to:</h2>
      <h1>{detailBook.bookTitle}</h1>
      <p>ID of the book: {id}</p>

      {/* biggerBackgroundImage: `url("${res.imageLinks?.thumbnail}")`, */}

      <div className="search-books-results">
        <ol className="books-grid">
          <Book key={id} book={detailBook} onBookChange={onChangeBookShelf} />
        </ol>
        <p>{additionalDataToABook.description}</p>
        <h2>More information:</h2>
        <ul>
          <li>Publisher: {additionalDataToABook.publisher}</li>
          <li>Published date: {additionalDataToABook.publishedDate}</li>
          <li>Content Version: {additionalDataToABook.contentVersion}</li>
          <li>Amount of Pages: {additionalDataToABook.pageCount}</li>
          <li>
            Language:{" "}
            {additionalDataToABook.language === "en"
              ? "English"
              : additionalDataToABook.language}
          </li>
          <li>Categories: {additionalDataToABook.categories}</li>
          <li>Maturity Rating: {additionalDataToABook.maturityRating}</li>
          <li>Print type: {additionalDataToABook.printType}</li>
          <li>
            <div>Link: </div>
            <a href={additionalDataToABook.infoLink}>
              {additionalDataToABook.infoLink}
            </a>
          </li>
          <li>
            Raitings count:{" "}
            {additionalDataToABook.ratingCount
              ? additionalDataToABook.ratingCount
              : "Not available."}
          </li>
        </ul>
      </div>

      <div className="search-button-back">
        <Link to="/">
          <button>Go back to Home</button>
        </Link>
      </div>
      <div className="search-button-back">
        <Link to="/search">
          <button>Go to Search</button>
        </Link>
      </div>
    </>
  );
};

export default BookDetailPage;
