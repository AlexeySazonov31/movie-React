import React from "react";
import filterImg from "./img/filter.png";
import rightImg from "./img/right.png";
import { useEffect, useState } from "react";

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
  menuActive,
  setMenuActive,
  handleReadMore,
  setMovies  
}) {
  const handleEnter = (event) => {
    if (event.key === "Enter") {
      handleEnterParent(search, type);
      setPastShow(show);
      setShow("search");
      setMenuActive(false);
      setFilterActive(false);
      setRealTimeRes([])
    }
  };
  let filterButton;
  if (
    show !== "movie" &&
    show !== "Top 250 Movies" &&
    show !== "Most Popular Movies" &&
    show !== "Most Popular TVs" &&
    show !== "New Movies"
  ) {
    filterButton = <img src={filterImg} alt="fl"></img>;
  }

  //------------ real time results:
  const [realTimeRes, setRealTimeRes] = useState([]);

  useEffect(() => {
    if (typeof search === "string" && search.length >= 3 ) {
      fetch(`/search/${search}`)
        .then((response) => response.json())
        .then((data) => {
          setRealTimeRes(data.Search ? data.Search : []);
        });
    } else {
      setRealTimeRes([]);
    }

  }, [search]);

  let realTimeResults;
  if (realTimeRes.length  && !menuActive && !filterActive) {
    realTimeResults = realTimeRes.map((movie, item) => {
      if (item <= 4) {
        return (
          <li key={movie.imdbID} onClick={() => {
            setPastShow('search')
            setMovies(realTimeRes)
            handleReadMore(movie.imdbID)
            setRealTimeRes([])
          }}>
            <div className="realTimeCardGrid">
              <img
                src={
                  movie.Poster !== "N/A"
                    ? normImageUrl(movie.Poster)
                    : `https://via.placeholder.com/300x400.png?text=${movie.Title}`
                }
                alt="img"
              />
              <div className="realTimeCardTitle">{movie.Title}</div>
              <div className="realTimeCardYear">{movie.Year ? movie.Year : movie.Type}</div>
            </div>
          </li>
        );
      }
    });
  } else {
    realTimeResults = <></>;
  }
  //--------------------------------

  return (
    <div className="search">
      <button
        className="buttonFilter"
        onClick={() => {
          setFilterActive(!filterActive);
          setRealTimeRes([])
        }}
      >
        {filterButton}
      </button>
      <div className="form">
        <input
          type="text"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          placeholder="movie"
          onKeyUp={handleEnter}
        />
        <button
          onClick={() => {
            handleEnterParent(search, type);
            setPastShow(show);
            setShow("search");
            setMenuActive(false);
            setFilterActive(false);
            setRealTimeRes([])
          }}
        >
          <img src={rightImg} alt="Enter" />
        </button>
      </div>
      {realTimeResults.length ? (
        <ul className="realTimeResults">{realTimeResults}</ul>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Search;

function normImageUrl(urlImage) {
  let idImage = urlImage.match(/\/([A-Za-z0-9@]){10,}\./);
  return "https://m.media-amazon.com/images/M" + idImage + "_V1_SX100.jpg";
}
