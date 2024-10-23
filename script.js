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