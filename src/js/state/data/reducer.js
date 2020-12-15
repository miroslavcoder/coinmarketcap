import {
    SET_DATA,
    SEARCH_COINS,
    ADD_TO_FAVORITES,
    DELETE_FAVORITE,
    SET_FAVORITES
} from './constants';

const defaultState = {};

export default (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_DATA:
            return Object.assign({}, state, {
                coins: payload.data
            });
        case SET_FAVORITES:
            return Object.assign({}, state, {
                favorites: payload
            });
        case SEARCH_COINS:
            const searchedCoins = state.coins ?
                state.coins.filter(coin => {
                        const name = coin.name.toUpperCase();
                        const symbol = coin.symbol.toUpperCase();
                        const query = payload.toUpperCase();
                        return name.indexOf(query) > -1 || symbol.indexOf(query) > -1;
                    }
                ) : [];
            return Object.assign({}, state, {
                searchedCoins
            });
        case ADD_TO_FAVORITES:
            const newFavorites = state.favorites ? [...state.favorites] : [];
            newFavorites.push(payload);
            return Object.assign({}, state, {
                favorites: newFavorites
            });
        case DELETE_FAVORITE:
            const newFavoritesList = state.favorites ? state.favorites.filter(item => item.id !== payload) : [];
            return Object.assign({}, state, {
                favorites: newFavoritesList
            });
        default:
            return state;
    }
};
