import Search from "./Search";
import { useState } from "react";
import leftImg from './img/left.png';


const menu = [
  {
    name: "Top 250 Movies",
    url: "/selectionData/Top250Movies",
  },
  {
    name: "Most Popular Movies",
    url: "/selectionData/MostPopularMovies",
  },
  {
    name: "Most Popular TVs",
    url: "/selectionData/MostPopularTVs",
  },
  {
    name: "New Movies",
    url: "/selectionData/ComingSoon",
  },
  {
    name: "In Theaters",
    url: "/selectionData/InTheaters",
  },
  {
    name: "Box Office - new movies",
    url: "/selectionData/BoxOffice",
  }
];

function Header(props) {
  const [menuActive, setMenuActive] = useState(false);
  const [filterActive, setFilterActive] = useState(false);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");

  const menuElem = menu.map((note, item) => {
    let className;
    if( props.show === note.name ){
      className = 'selected';
    }
    return (
      <li className={className} key={item} onClick={ () => {
        props.setPastShow(props.show);
        props.setShow(note.name);
        props.handleSelectionFilms(note.url);
        setMenuActive(false);
        setFilterActive(false);
      } }>
         {note.name} 
      </li>
    );
  });

  let ht;
  if (menuActive) {
    if(filterActive){
      ht = { height: "490px" };
    } else {
      ht = { height: "440px" };
    }
  } else {
    if ( filterActive ){
      ht = { height: "120px" };
    } else {
      ht = { height: "55px" };
    }
  }

  const handleFilter = (event) => {
    setType(event.target.value);
    props.handleEnterParent(search, event.target.value);
    setFilterActive(false);
    setMenuActive(false);
  };

  return (
    <header className="header" style={ht}>
      <div className="headerGrid">
        { props.show === 'movie' ? (
          <button className="backButton" onClick={() => {
            props.setShow(props.pastShow);
            setMenuActive(false);
          }}>
            <img src={leftImg} alt=""/>
          </button> 
        ) : (
          <h2>MvS</h2>
        ) }

        <Search
          handleEnterParent={props.handleEnterParent}
          filterActive={filterActive}
          setFilterActive={setFilterActive}
          search={search}
          setSearch={setSearch}
          type={type}
          show={props.show}
          setShow={props.setShow}
          setPastShow={props.setPastShow}
          setMenuActive={setMenuActive}
        />

        <button
          className="buttonMenu"
          onClick={() => {
            setMenuActive(!menuActive);
          }
        }
        >
          <hr width={menuActive ? "40px" : "22px"} />
          <hr width={menuActive ? "40px" : "40px"} />
          <hr width={menuActive ? "40px" : "33px"} />
        </button>
      </div>
        {filterActive ? (
          <div className="labelDiv">
            <label>
              <input
                type="radio"
                name="type"
                value="all"
                onChange={handleFilter}
                checked={type === "all" ? true : false}
              />
              <span>all</span>
            </label>
            <label>
              <input
                type="radio"
                name="type"
                value="movie"
                onChange={handleFilter}
                checked={type === "movie" ? true : false}
              />
              <span>movies</span>
            </label>
            <label>
              <input
                type="radio"
                name="type"
                value="series"
                onChange={handleFilter}
                checked={type === "series" ? true : false}
              />
              <span>series</span>
            </label>
          </div>
        ) : (
          <></>
        )}

      {menuActive ? <ul>{menuElem}</ul> : <></>}
    </header>
  );
}

export default Header;
