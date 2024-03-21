import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        console.log(data);
      });
  }, []);

  const displayBooks = books.map((book) => (
    <>
      <div className="col-3 p-3">
        <div class="card" width={"18rem"}>
          <img src={book.Image} class="card-img-top" alt="..." width={"100%"} />
          <div class="card-body">
            <h5 class="card-title">{book.Title}</h5>
            <p class="card-text text-align-center">{book.Author}</p>
            <Link
              to={"/details/" + book.BookId}
              type="button"
              class="btn btn-primary"
            >
              Detail
            </Link>
          </div>
        </div>
      </div>
    </>
  ));

  return (
    <>
      <div className="container">
        <div className="row">{displayBooks}</div>
      </div>
    </>
  ); // Return JSX elements
};

export default Home;
