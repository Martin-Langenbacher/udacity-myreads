const BookShelfChanger = () => {
const  handleSelectButton = (event) => {
    console.log(event.target.selectedOptions[0].getAttribute("value"));
    // console.log(event.target.selectedOptions[1].getAttribute("value"));
  }


  return (
    <div className="book-shelf-changer">
      <select name="abc" id="input-abc" onChange={handleSelectButton}>
        <option value="none" disabled>
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
