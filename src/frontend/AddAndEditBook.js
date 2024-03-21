import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BookAdd = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/book/${id}`)
        .then((res) => res.json())
        .then((res) => setData(res))
        .catch((error) => console.error("Fetch error:", error));
    }
  }, [id]);

  const handleAddBook = () => {
    const url = id
      ? `http://localhost:3001/book/${id}`
      : "http://localhost:3001/book";
    const method = id ? "PUT" : "POST";

    fetch(url, {
      method: method,
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((responseData) => {
        console.log("Book operation successful:", responseData);
        navigate("/home"); // Navigate after successful addition or update
      })
      .catch((error) => {
        console.error("Error performing book operation:", error);
        // Handle the error (e.g., display an error message)
      });
  };

  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>
              <input
                placeholder="Enter Book Image Url"
                value={data.Image || ""}
                onChange={(e) => setData({ ...data, Image: e.target.value })}
                type="text"
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                placeholder="Enter Book Title"
                value={data.Title || ""}
                onChange={(e) => setData({ ...data, Title: e.target.value })}
                type="text"
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                placeholder="Enter Book Author Name"
                value={data.Author || ""}
                onChange={(e) => setData({ ...data, Author: e.target.value })}
                type="text"
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                placeholder="Enter Book Genre"
                value={data.Genre || ""}
                onChange={(e) => setData({ ...data, Genre: e.target.value })}
                type="text"
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                placeholder="Enter Book AvailableCopies"
                value={data.AvailableCopies || ""}
                onChange={(e) =>
                  setData({ ...data, AvailableCopies: e.target.value })
                }
                type="text"
              />
            </td>
          </tr>
          <tr>
            <td colSpan="3">
              <button onClick={handleAddBook}>
                {id ? "Edit" : "Add"} Book
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default BookAdd;
