import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Details = () => {
    const api = "http://localhost:3001/book/"
    const [data, setData] = useState([]);

    let { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        fetch(api + id)
            .then((res) => res.json())
            .then((res) => setData(res))
            .catch((error) => console.error("Fetch error:", error));
    }, [id]);

    return (
        <>
            <div className="container" key={data.BookId}>
                <div className="row">
                    <div className="col-md-2">
                        <img src={data.Image} alt="..." className="img-fluid" />
                    </div>
                    <div className="col-md-6 d-flex flex-column justify-content-start">
                        <h4>{data.Title}</h4>
                        <p>{data.Author}</p>
                        <p>{data.Genre}</p>
                        <p>{data.AvailableCopies}</p>
                    </div>
                    <div className="col-md-1">
                        <button
                            className="btn btn-primary m-3"
                            onClick={() => {
                                navigate("/addbook/" + id);
                            }}
                        >
                            Edit
                        </button>
                        <button
                            className="btn btn-warning m-3"
                            onClick={() => {
                                navigate(-1);
                            }}
                        >
                            Back
                        </button>
                    </div>
                    <button
                        className="btn btn-danger m-3"
                        onClick={() => {
                            fetch(api + id, {
                                method: "DELETE",
                            })
                                .then((res) => {
                                    return res.json();
                                })
                                .then((res) => {
                                    console.log(res);
                                    navigate("/home");
                                });
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </>
    );
}

export default Details;
