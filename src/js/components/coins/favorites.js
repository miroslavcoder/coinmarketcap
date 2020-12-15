import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { deleteFavorite } from '../../state/data/actions';
import { bindActionCreators } from 'redux';
import { setLocalStorage } from '../../utils/local-storage';


const Favorites = ({ favorites, deleteFavorite }) => {
    const [ count, setCount ] = useState(0);
    const [ isCollapsed, setIsCollapsed ] = useState(true);
    useEffect(() => {
        if(favorites) {
            setCount(favorites.length);
            setLocalStorage('favorites', JSON.stringify(favorites));
        }
    }, [favorites]);

    const toggleFavorites = () => {
        setIsCollapsed(!isCollapsed);
    };

    if(isCollapsed) {
        return <div className="favorites-collapsed-container" onClick={toggleFavorites}>Favorites({count})</div>;
    }

    const deleteItem = (id) => {
        deleteFavorite(id);
    };


    return (
        <div className="favorites-open-container">
            <FontAwesomeIcon onClick={toggleFavorites} className="fa-close-btn" icon={faWindowClose}/>
            <h3>Your Favorites list</h3>
            { favorites && favorites.length ? (
                favorites.map(favorite => {
                    return (
                        <div key={favorite.id} className="favorite-item">
                            <div className="favorite-cel">{favorite.name}</div>
                            <div className="favorite-cel">
                                ${ favorite.quote.USD.price > 1 ? favorite.quote.USD.price.toFixed(2) : favorite.quote.USD.price.toFixed(6) }
                            </div>
                            <div className="delete-btn" onClick={() => deleteItem(favorite.id)}>
                                <FontAwesomeIcon icon={faTrash}/>
                            </div>
                        </div>
                    )
                })
            ) : <h4 className="no-items-title">There are no any coins.</h4>

            }
        </div>
    );

};

const mapStateToProps = state => {
    return {
        favorites: state.data.favorites
    }
};

const mapDispatchToProps = dispatch => {
    return {
        deleteFavorite: bindActionCreators(deleteFavorite, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);