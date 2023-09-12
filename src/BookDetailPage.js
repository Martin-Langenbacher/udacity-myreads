import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Header from "./components/Header";
import Book from "./Book";
import { get } from "./BooksAPI";

const BookDetailPage = ({ addThisBook, onBooksDataChange, books }) => {
  const [detailBook, setDetailBook] = useState({});
  const [additionalDatoToABook, setAdditionalDatoToABook] = useState({});
  const { id } = useParams();

  const onChangeBookShelf = (bookWhichWillChange) => {
    console.log("bookWhichWillChange", bookWhichWillChange);
    const bookFromDetailPage = {
      id: bookWhichWillChange.id,
      backgroundImage: bookWhichWillChange.backgroundImage,
      bookTitle: bookWhichWillChange.bookTitle,
      author: bookWhichWillChange.author,
      shelf: bookWhichWillChange.shelf,
    };

    if (books.some((book) => book.id === bookWhichWillChange.id)) {
      console.log("Element exists in the array.");
      // Book already exist:
      onBooksDataChange(bookFromDetailPage);
    } else {
      console.log("Element does not exist in the array.");
      // New book (deep dive via SearchPage)
      addThisBook(bookFromDetailPage);
    }

    /*
    const bookAlreadyExists = (books) => {
      books.some((book) => book.id === bookWhichWillChange.id);
    };
    console.log("******************", bookAlreadyExists);
    if (bookAlreadyExists) {
    } else {
    }
    */
  };

  useEffect(() => {
    get(id)
      .then((res) => {
        console.log("result: ", res);

        const author =
          res.authors && res.authors.length > 0 ? res.authors[0] : "Unknown";

        const detailBookData = {
          id: id,
          backgroundImage: `url("${res.imageLinks?.smallThumbnail}")`,
          bookTitle: res.title,
          author: author,
          shelf: "none",
        };

        const additionalDatoToABook = {
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

        console.log("detailBookData >>>>>", detailBookData);
        setDetailBook(detailBookData);

        console.log("detailBookData >>>>>", additionalDatoToABook);
        setAdditionalDatoToABook(additionalDatoToABook);
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
        <p>{additionalDatoToABook.description}</p>
        <h2>More information:</h2>
        <ul>
          <li>Publisher: {additionalDatoToABook.publisher}</li>
          <li>Published date: {additionalDatoToABook.publishedDate}</li>
          <li>Content Version: {additionalDatoToABook.contentVersion}</li>
          <li>Amount of Pages: {additionalDatoToABook.pageCount}</li>
          <li>
            Language:{" "}
            {additionalDatoToABook.language === "en"
              ? "English"
              : additionalDatoToABook.language}
          </li>
          <li>Categories: {additionalDatoToABook.categories}</li>
          <li>Maturity Rating: {additionalDatoToABook.maturityRating}</li>
          <li>Print type: {additionalDatoToABook.printType}</li>
          <li>
            <div>Link: </div>
            <a href={additionalDatoToABook.infoLink}>
              {additionalDatoToABook.infoLink}
            </a>
          </li>
          <li>
            Raitings count:{" "}
            {additionalDatoToABook.ratingCount
              ? additionalDatoToABook.ratingCount
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
