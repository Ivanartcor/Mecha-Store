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

// utils/ui.js
export function showMessage(message, elementId, type = "success") {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerText = message;
        element.className = type === "success" ? "message-container message-success" : "message-container message-error";
    }
}

export function clearMessage(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerText = "";
        element.className = "message-container";
    }
}

