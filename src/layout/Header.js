import Search from "./Search";
import { useState } from "react";

const menu = [
  {
    name: 'Top 250 Movies',
    url: 'https://imdb-api.com/en/API/Top250Movies/'
  },
  {
    name: 'Most Popular Movies',
    url: 'https://imdb-api.com/en/API/MostPopularMovies/'
  },
  {
    name: 'Most Popular TVs',
    url: 'https://imdb-api.com/en/API/MostPopularTVs/'
  },
  {
    name: 'New Movies: Coming Soon',
    url: 'https://imdb-api.com/en/API/ComingSoon/'
  }
 ];

function Header(props) {

  const [menuActive, setMenuActive] = useState(false);

  const menuElem = menu.map( (note, item) => {
    return <li key={item}><span>&#9734;</span> {note.name} <span>&#9734;</span></li>
  } )

  let ht;
  if( menuActive ){
    ht = {height: '310px'}
  } else {
    ht = {height: '60px'}
  }

  return (
    <header className="header" style={ht}>
      <div className="headerGrid">

        <h2>MvS</h2>

        <Search handleEnterParent={props.handleEnterParent} />

        <button
          className="buttonMenu"
          onClick={() => {
            setMenuActive(!menuActive);
          }}
        >
          <hr width={menuActive ? "40px" : "22px"} />
          <hr width={menuActive ? "40px" : "40px"} />
          <hr width={menuActive ? "40px" : "33px"} />
        </button>

      </div>

      {menuActive ? <ul>{menuElem}</ul> : <></>}

    </header>
  );
}

export default Header;
