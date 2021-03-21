import React, { useRef, useEffect } from "react";
import { useBookSearch } from "../context";

const SearchForm = () => {
  const { setSearchTerm } = useBookSearch();
  const query = useRef("");

  const searchBook = () => {
    setSearchTerm(query.current.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    query.current.focus();
  }, []);

  return (
    <section className="section search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">enter book title</label>
          <input type="text" id="name" ref={query} onChange={searchBook} />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
