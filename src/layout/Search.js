import React, {useState} from "react";

function Search({handleEnterParent}) {

    const [search, setSearch] = useState('');
    const [type, setType] = useState('all');

    const handleEnter = (event) => {
        if(event.key === 'Enter'){
            handleEnterParent(search, type);
        }
    }

    const handleFilter = (event) => {
        setType(event.target.value);
        handleEnterParent(search, event.target.value);
    }

    return <div>
        <input
            className="searchInp"
            type="text"
            value={search}
            onChange={ (event) => { setSearch(event.target.value) }}
            placeholder='name movie'
            onKeyUp={handleEnter}
        />
        <button
            onClick={() => {handleEnterParent(search,type)}}>
            search
        </button>
        <div>
            <label>
                <input
                    type='radio'
                    name="type"
                    value='all'
                    onChange={handleFilter}
                    checked={type === 'all' ? true : false}
                />
                <span>all</span>
            </label>
            <label>
                <input
                    type='radio'
                    name="type"
                    value='movie'
                    onChange={handleFilter}
                    checked={type === 'movie' ? true : false}
                />
                <span>movies only</span>
            </label>
            <label>
                <input
                    type='radio'
                    name="type"
                    value='series'
                    onChange={handleFilter}
                    checked={type === 'series' ? true : false}
                />
                <span>series only</span>
            </label>
        </div>
    </div>
}


export default Search;