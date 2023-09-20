import PropTypes from "prop-types";

const BookShelfChanger = ({ onShelfChange, shelfs, book }) => {
  const handleSelectButton = (event) => {
    const newSelectedShelf =
      event.target.selectedOptions[0].getAttribute("value");
    onShelfChange(newSelectedShelf);
  };

  return (
    <div className="book-shelf-changer">
      <select value={book.shelf} onChange={handleSelectButton}>
        <option value="disabled" disabled>
          Move to...
        </option>
        {shelfs.map((shelf) => (
          <option key={shelf.shelfname} value={shelf.shelfname}>
            {shelf.title}
          </option>
        ))}
      </select>
    </div>
  );
};

BookShelfChanger.propTypes = {
  onShelfChange: PropTypes.func.isRequired,
  shelfs: PropTypes.array.isRequired,
  book: PropTypes.object.isRequired,
};

export default BookShelfChanger;
