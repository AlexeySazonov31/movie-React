import Search from "./Search";
import { useState } from "react";

function Header(props) {
  const [menuActive, setMenuActive] = useState(false);

  return (
    <header className="header">
      <div className="headerGrid">

        <h2>MovieS</h2>

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

      {menuActive ? <div>sffsf</div> : <></>}

    </header>
  );
}

export default Header;
