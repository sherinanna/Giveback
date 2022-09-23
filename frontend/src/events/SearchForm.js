import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchForm.css";

/** Search widget.
 *
 * Appears on the events page for filtering displayed events
 *
 *
 * This component doesn't *do* the searching, but it renders the search
 * form and calls the `searchFor` function prop that runs in a parent to do the
 * searching.
 *
 *
 */

function SearchForm({ searchFor }) {
  console.debug("SearchForm", "searchFor=", typeof searchFor);

  const [searchTerm, setSearchTerm] = useState("");

  /** Tell parent to filter */
  function handleSubmit(evt) {
    // take care of accidentally trying to search for just spaces
    evt.preventDefault();
    searchFor(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  }

  /** Update form fields */
  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
    <div className="SearchForm mb-4 mt-4">
      <h3 className="text-center"> Discover Opportunities</h3>
      <form className=" form-inline input-group" onSubmit={handleSubmit}>
        <input
          className="form-control "
          name="searchTerm"
          placeholder="Enter search term.."
          value={searchTerm}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="btn btn-lg search-btn input-group-append"
        >
          <FaSearch
            style={{
              color: "white",
              fontSize: "40px",
              backgroundColor: "#2c5d63",
              padding: "10px",
            }}
          />
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
