import axios from 'axios';
import {
    SET_DATA,
    SEARCH_COINS,
    ADD_TO_FAVORITES,
    DELETE_FAVORITE,
    SET_FAVORITES
} from './constants';

const DATA_API = 'https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
const API_KEY = '4c8a6ef6-dd54-4b2b-84b3-0c6c1e0d1157';

export function fetchData(currencyType = 'all', limit = '100') {
    return dispatch => {
        return axios.get(`${DATA_API}?limit=${limit}&cryptocurrency_type=${currencyType}`, {
            headers: {
                'X-CMC_PRO_API_KEY': API_KEY
            }
            })
            .then(response => {
                dispatch(setData(response.data));
            })
            .catch(error => {
                console.log('error', error);
            });
    };
}

export const setData = (data) => {
    return {
        type: SET_DATA,
        payload: data
    };
};

export const searchCoins = (value) => {
    return {
        type: SEARCH_COINS,
        payload: value
    };
};

export const setFavorites = (list) => {
    return {
        type: SET_FAVORITES,
        payload: list
    };
};

export const addToFavorites = (coin) => {
    return {
        type: ADD_TO_FAVORITES,
        payload: coin
    };
};

export const deleteFavorite = (id) => {
    return {
        type: DELETE_FAVORITE,
        payload: id
    };
};
