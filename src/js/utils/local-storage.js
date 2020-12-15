export const getLocalStorage = key => {
    return typeof window === 'object' ? localStorage.getItem(key) : null;
};

export const setLocalStorage = (key, val) => {
    return typeof window === 'object' ? localStorage.setItem(key, val) : null;
};

export const clearLocalStorageKey = key => {
    return typeof window === 'object' ? localStorage.removeItem(key) : null;
};
