import React, {useState} from "react";

function Search(props) {

    const [search, setSearch] = useState('');
    const [type, setType] = useState('all');

    const handleEnter = (event) => {
        if(event.key === 'Enter'){
            props.handleEnter(search, type);
        }
    }

    const handleFilter = (event) => {
        setType(event.target.value);
        props.handleEnter(search, event.target.value);
    }

    return <div>
        <input
            type="text"
            value={search}
            onChange={event => { setSearch(event.target.value) }}
            placeholder='name movie'
            onKeyUp={handleEnter}
        />
        <button
            onClick={() => {props.handleEnter(search,type)}}>
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