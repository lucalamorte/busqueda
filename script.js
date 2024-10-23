// Función para obtener los parámetros de la URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Verificar si la URL contiene el parámetro 'query'
function checkAndSetQuery() {
    const queryParam = getQueryParam('query');
    
    // Si 'query' no está presente, agregarlo a la URL
    if (queryParam === null) {
        // Actualizar la URL sin recargar la página
        window.history.replaceState({}, document.title, "?query=");
    }

    // Si 'query' existe (aunque esté vacío), podemos rellenar el campo de búsqueda
    document.getElementById('searchInput').value = queryParam || '';
}
checkAndSetQuery();

// Seleccionar los elementos del DOM
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchHistory = document.getElementById('searchHistory');

// Cargar historial de búsquedas de localStorage al cargar la página
document.addEventListener('DOMContentLoaded', loadSearchHistory);
// Agregar la búsqueda al hacer clic en el botón
searchButton.addEventListener('click', addSearch);

// Función para agregar una búsqueda al historial
function addSearch() {
    const query = searchInput.value.trim();

    if (query !== "") {
        // Guardar en localStorage
        let searches = JSON.parse(localStorage.getItem('searches')) || [];
        searches.push(query);
        if (searches.length >= 5) {
            searches.shift(); // Elimina el primer elemento
        }
        localStorage.setItem('searches', JSON.stringify(searches));

        // Actualizar el historial en la página
        renderSearchHistory();

        // Limpiar el campo de búsqueda
        searchInput.value = '';
    }
}

// Función para cargar el historial de búsquedas
function loadSearchHistory() {
    renderSearchHistory();
}

// Función para mostrar el historial en la página
function renderSearchHistory() {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    searchHistory.innerHTML = '';

    // Mostrar solo las últimas 5 búsquedas (por ejemplo)
    searches.slice(-5).forEach((search, index) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = "#";  // Puedes cambiar esto a una URL que busque en tu aplicación
        a.textContent = search;
        li.appendChild(a);
        searchHistory.appendChild(li);
    });
}