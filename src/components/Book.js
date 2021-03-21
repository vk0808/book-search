import React from "react";
import { Link } from "react-router-dom";
const defaultUrl =
  "https://thumbs.dreamstime.com/b/very-old-empty-book-cover-made-embossed-leather-vintage-border-design-63785783.jpg";

const Book = ({ id, title, image, authors }) => {
  return (
    <Link to={`/book/${id}`}>
      <article className="book card">
        <div className="img-container">
          <img
            src={image === undefined ? defaultUrl : `${image.thumbnail}`}
            alt={title}
          />
        </div>
        <div className="book-footer info">
          <h3>{title}</h3>
          <p>
            {authors === undefined
              ? ""
              : authors.map((author, index) => {
                  return <span key={index}>{author} </span>;
                })}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default Book;
