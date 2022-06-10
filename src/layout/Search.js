import React from "react";
import filterImg from './img/filter.png';
import rightImg from './img/right.png';
 

function Search({
  handleEnterParent,
  filterActive,
  setFilterActive,
  search,
  setSearch,
  type,
  show,
  setShow,
  setPastShow,
  setMenuActive
}) {
  const handleEnter = (event) => {
    if (event.key === "Enter") {
      handleEnterParent(search, type);
      setPastShow(show);
      setShow('search');
      setMenuActive(false);
      setFilterActive(false);
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
            handleEnterParent(search, type);
            setPastShow(show)
            setShow('search');
            setMenuActive(false);
            setFilterActive(false);
          }}
        ><img src={rightImg} alt="Enter"/></button>
      </div>
    </div>
  );
}

export default Search;
