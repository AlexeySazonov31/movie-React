import Search from "./Search";

function Header(props){
    return <header className="header">
        <div className="logo">
            <h2>Movie search</h2>
            <Search handleEnterParent={props.handleEnterParent}/>
        </div>
    </header>
}

export default Header;