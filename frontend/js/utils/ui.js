// utils/ui.js
//Encargado de manipular el DOM.

export function showError(message, elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) errorElement.innerText = message;
}

export function clearError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) errorElement.innerText = '';
}

export function setInnerHTML(elementId, html) {
    const element = document.getElementById(elementId);
    if (element) element.innerHTML = html;
}
