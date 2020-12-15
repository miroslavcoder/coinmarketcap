import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { addToFavorites } from '../../state/data/actions';
import { connect }  from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { setLocalStorage } from '../../utils/local-storage';

const CoinItem = ({ coin, addToFavorites, favorites }) => {
    const [ isFavorite, setIsFavorite ] = useState(false);
    const [ isActive, setIsActive ] = useState(false);

    useEffect(() => {
        if(favorites) {
            setIsFavorite(!!favorites.filter(item => item.id === coin.id).length);
            setLocalStorage('favorites', JSON.stringify(favorites));
        }
    }, [favorites]);

    if(!coin) {
        return null;
    }

    const { id, name, symbol, quote } = coin;

    const setFavorites = () => {
        if(favorites) {
            if(!favorites.filter(item => item.id === coin.id).length) {
                addToFavorites(coin);
                setIsFavorite(true);
            } else {
                setIsActive(true);
                setTimeout(() => setIsActive(false), 2000);
            }
        } else {
            addToFavorites(coin);
            setIsFavorite(true);
        }
    };

    return (
        <tr>
            <td className="coin-name-wrapper">
                <span className={`fa-icon-wrapper ${ isFavorite ? 'active' : '' }`} onClick={setFavorites}>
                    <span className="tooltip-text">{ isFavorite ? 'Coin is favorite' : 'Add to favorites' }</span>
                    <FontAwesomeIcon icon={faStar}/>
                </span>
                <img className="coin-logo" src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`}/>
                <div className="coin-name">{name}</div>
                { isActive && <div className="info-message">You can not add this coin again</div> }
            </td>
            <td>
                <div className="coin-symbol">{symbol}</div>
            </td>
            <td>
                <div className="coin-price">${ quote.USD.price > 1 ? quote.USD.price.toFixed(2) : quote.USD.price.toFixed(6) }</div>
            </td>
        </tr>
    )
};


const mapStateToProps = state => {
    return {
        favorites: state.data.favorites
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addToFavorites: bindActionCreators(addToFavorites, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoinItem);
