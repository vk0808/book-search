import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
import LinesEllipsis from "react-lines-ellipsis";
import Stars from "react-stars-display";
import "../styles.css";

const url = "https://www.googleapis.com/books/v1/volumes/";
const defaultUrl =
  "https://thumbs.dreamstime.com/b/very-old-empty-book-cover-made-embossed-leather-vintage-border-design-63785783.jpg";

const SingleBook = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const [more, setMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${url}${id}`)
      .then((response) => {
        if (response.data.volumeInfo) {
          const {
            title,
            subtitle,
            authors,
            publisher,
            publishedDate: year,
            description: info,
            pageCount: pages,
            imageLinks: image,
            averageRating: rating,
            language,
            industryIdentifiers: isbn,
            ratingsCount: count,
            categories: category
          } = response.data.volumeInfo;
          const newBook = {
            title,
            subtitle,
            authors,
            publisher,
            year,
            info,
            pages,
            image,
            rating,
            language,
            isbn,
            count,
            category
          };
          setBook(newBook);
        } else {
          setBook(null);
        }
        setLoading(false);
        console.log(response.data, book);
        console.log(`${url}${id}`);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!book) {
    return <h2 className="section-title">oops! can't find book details</h2>;
  }

  const {
    title,
    subtitle,
    authors,
    publisher,
    year,
    info,
    pages,
    image,
    rating,
    language,
    isbn,
    count,
    category
  } = book;

  return (
    <section className="section book-section">
      <Link to="/" className="btn">
        go back
      </Link>
      <h2 className="section-title">{title}</h2>
      <div className="single-book">
        <img
          src={image === undefined ? defaultUrl : image.thumbnail}
          alt={title}
        />
        <div className="single-book-info">
          <h2 style={{ marginBottom: "2rem" }}>Book Information</h2>
          <p>
            <span className="single-book-data">title :</span>
            {title}
            {subtitle && <span>: {subtitle}</span>}
          </p>
          {language === undefined ? (
            ""
          ) : (
            <p>
              <span className="single-book-data">language :</span>
              {language === "en" ? "english" : language}
            </p>
          )}
          {authors === undefined ? (
            ""
          ) : (
            <p>
              <span className="single-book-data">
                author<span style={{ textTransform: "lowercase" }}>(s) </span>:
              </span>
              <ul>
                {authors.map((author, index) => {
                  return author ? <li key={index}>{author}</li> : null;
                })}
              </ul>
            </p>
          )}
          {isbn === undefined ? (
            ""
          ) : (
            <p>
              <span className="single-book-data">ISBN :</span>
              {isbn[0].identifier}, {isbn[1].identifier}
            </p>
          )}
          {category === undefined ? (
            ""
          ) : (
            <p>
              <span className="single-book-data">
                genre<span style={{ textTransform: "lowercase" }}>(s) </span> :
              </span>
              <ul>
                {category.map((cat, index) => {
                  return cat ? <li key={index}>{cat}</li> : null;
                })}
              </ul>
            </p>
          )}
          {info === undefined ? (
            ""
          ) : (
            <p>
              <span className="single-book-data">description :</span>
              <div style={{ textTransform: "none", display: "inline" }}>
                <LinesEllipsis
                  style={{ display: "inline" }}
                  text={info.replace(/<(.|\n)*?>/g, "")}
                  maxLine={`${more ? "100" : "4"}`}
                  ellipsis="..."
                  trimRight
                  basedOn="letters"
                />
              </div>
              <button
                style={{ marginTop: "1rem", display: "block" }}
                className="btn"
                type="button"
                onClick={() => setMore(!more)}
              >
                {more ? "read less" : "read more"}
              </button>
            </p>
          )}
          {publisher === undefined ? (
            ""
          ) : (
            <p>
              <span className="single-book-data">publisher :</span>
              {publisher}
            </p>
          )}
          {year === undefined ? (
            ""
          ) : (
            <p>
              <span className="single-book-data">publication date :</span>
              {year}
            </p>
          )}
          <p>
            <span className="single-book-data">rating :</span>
            {rating ? (
              <span className="average-rating">
                <Stars stars={rating} size={30} />({rating} stars out of {count}{" "}
                ratings)
              </span>
            ) : (
              "no rating"
            )}
          </p>
          {pages === undefined ? (
            ""
          ) : (
            <p>
              <span className="single-book-data">page count :</span>
              <span style={{ textTransform: "none" }}>{pages} pages</span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default SingleBook;
