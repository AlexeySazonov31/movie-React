import React from "react";
import filterImg from './img/filter.png';

function Search({
  handleEnterParent,
  filterActive,
  setFilterActive,
  search,
  setSearch,
  type,
}) {
  const handleEnter = (event) => {
    if (event.key === "Enter") {
      handleEnterParent(search, type, false);
    }
  };

  return (
    <div className="search">
      <button
        className="buttonFilter"
        onClick={() => {
          setFilterActive(!filterActive);
        }}
      >
        <img src={filterImg} alt="fl"></img>
      </button>
      <div className="form">
        <input
          type="text"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          placeholder="name movie"
          onKeyUp={handleEnter}
        />
        <button
          onClick={() => {
            handleEnterParent(search, type, false);
          }}
        ></button>
      </div>
    </div>
  );
}

export default Search;
