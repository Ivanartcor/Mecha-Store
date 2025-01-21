//Encargado de gestionar la interacción con localStorage y sessionStorage.

// utils/storage.js

export function setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getItem(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
}

export function removeItem(key) {
    localStorage.removeItem(key);
}

export function clearStorage() {
    localStorage.clear();
}
