import React from 'react';

const Search = ({ searchItems }) => {
    return (
        <div className="search-wrapper">
            <input className="search-input" placeholder="Search" type="text" onChange={searchItems}/>
        </div>
    )
};

export default Search;