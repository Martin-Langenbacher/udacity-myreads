const BookShelfChanger = ({ onShelfChange }) => {
  const handleSelectButton = (event) => {
    const newSelectedShelf =
      event.target.selectedOptions[0].getAttribute("value");
    onShelfChange(newSelectedShelf);
  };

  return (
    <div className="book-shelf-changer">
      <select defaultValue="disabled" onChange={handleSelectButton}>
        <option value="disabled" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

export default BookShelfChanger;
