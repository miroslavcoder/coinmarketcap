import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchData, searchCoins, setFavorites } from '../../state/data/actions';

import CoinItem from './coin-item';
import Search from '../search/search';
import Favorites from './favorites';
import { getLocalStorage } from '../../utils/local-storage';

const CoinsList = ({ fetchData, coins, searchedCoins, searchCoins, setFavorites }) => {
    const [ isSearching, setIsSearching ] = useState(false);
    const [ sortBy, setSortBy ] = useState('');
    const [ desc, setDesc ] = useState(false);
    const [ activeFilter, setActiveFilter ] = useState('all');
    const [ activeRows, setActiveRows ] = useState('100');

    let list = isSearching ? searchedCoins : coins;

    useEffect(() => {
        fetchData();
        const favoritesList = getLocalStorage('favorites');
        if(favoritesList) {
            setFavorites(JSON.parse(favoritesList));
        }
        console.log('render');
    }, []);

    console.log(list);

    const searchItems = (e) => {
        const value = e.target.value;
        if(value.length >= 2) {
            setIsSearching(true);
            searchCoins(value);
        } else if(!value) {
            setIsSearching(false);
        }
    };

    const filterActivate = (e) => {
        const query = e.target.dataset.query;
        const limit = query === 'limit' ? e.target.value : activeRows;
        const currType = query === 'cryptocurrency_type' ? e.target.id : activeFilter;
        if(query === 'limit') {
            setActiveRows(limit);
        } else {
            setActiveFilter(currType);
        }
        fetchData(currType, limit);
    };

    const dynamicSort = (property, direction) => {
        if (direction) {
            return function(a, b) {
                const propA = property !== 'price' ? a[property] : a.quote.USD[property];
                const propB = property !== 'price' ? b[property] : b.quote.USD[property];
                return (propA > propB) ? -1 : (propA < propB) ? 1 : 0;
            };
        }
        return function(a, b) {
            const propA = property !== 'price' ? a[property] : a.quote.USD[property];
            const propB = property !== 'price' ? b[property] : b.quote.USD[property];
            return (propA < propB) ? -1 : (propA > propB) ? 1 : 0;
        };
    };

    const sortCoins = (e) => {
        const id = e.target.id;
        const direction = sortBy === id ? !desc : false;
        setDesc(direction);
        setSortBy(id);
        list = list.sort(dynamicSort(id, direction));
    };

    return (
        <div className="coins-list-page">
            <Search searchItems={searchItems}/>
            <Favorites/>
            <div className="filters">
                <div className="select-wrapper">
                    <label htmlFor="show-rows">Show rows</label>
                    <select data-query="limit" value={activeRows} onChange={filterActivate}>
                        <option value="100">100</option>
                        <option value="50">50</option>
                        <option value="20">20</option>
                    </select>
                </div>
                <div
                    onClick={filterActivate}
                    data-query="cryptocurrency_type"
                    className={`filter ${ activeFilter === 'all' ? 'active' : '' }`}
                    id="all"
                >
                    All
                </div>
                <div
                    onClick={filterActivate}
                    data-query="cryptocurrency_type"
                    className={`filter ${ activeFilter === 'coins' ? 'active' : '' }`}
                    id="coins"
                >
                    Coins
                </div>
                <div
                    onClick={filterActivate}
                    data-query="cryptocurrency_type"
                    className={`filter ${ activeFilter === 'tokens' ? 'active' : '' }`}
                    id="tokens"
                >
                    Tokens
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th onClick={sortCoins} className="sort-title" id="name">Name</th>
                        <th onClick={sortCoins} className="sort-title" id="symbol">Symbol</th>
                        <th onClick={sortCoins} className="sort-title" id="price">Price</th>
                    </tr>
                </thead>
                <tbody>
                    { list && list.length ? (
                         list.map(coin => {
                            return <CoinItem key={coin.id} coin={coin}/>;
                         })
                    ): null
                    }
            </tbody>
            </table>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        coins: state.data.coins,
        searchedCoins: state.data.searchedCoins,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchData: bindActionCreators(fetchData, dispatch),
        searchCoins: bindActionCreators(searchCoins, dispatch),
        setFavorites: bindActionCreators(setFavorites, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoinsList);