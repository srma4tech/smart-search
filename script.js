const searchQuery = document.getElementById('searchQuery');
const searchFilters = document.getElementById('searchFilters');
const customFilter = document.getElementById('customFilter');
const searchButton = document.getElementById('searchButton');
const searchHistory = document.getElementById('searchHistory');
const clearHistory = document.getElementById('clearHistory');
const darkModeToggle = document.getElementById('darkModeToggle');

// Load search history on page load
document.addEventListener('DOMContentLoaded', () => {
    loadSearchHistory();
    applyDarkMode();
});

// Handle search button click
searchButton.addEventListener('click', () => {
    const query = searchQuery.value.trim();
    const selectedFilters = Array.from(searchFilters.selectedOptions).map(option => option.value).join('+');
    const custom = customFilter.value.trim();

    if (!query) {
        alert('Please enter a search query!');
        return;
    }

    let searchURL = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    if (selectedFilters) searchURL += `+${encodeURIComponent(selectedFilters)}`;
    if (custom) searchURL += `+${encodeURIComponent(custom)}`;

    saveSearchHistory(query, searchURL);

    window.open(searchURL, '_blank');
});

// Save to localStorage
function saveSearchHistory(query, url) {
    const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    history.unshift({ query, url });
    localStorage.setItem('searchHistory', JSON.stringify(history.slice(0, 10)));
    loadSearchHistory();
}

// Load search history
function loadSearchHistory() {
    const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    searchHistory.innerHTML = history
        .map((item, index) => `
            <li>
                <a href="${item.url}" target="_blank">${item.query}</a>
                <span class="delete-icon" onclick="deleteSearch(${index})">✖</span>
            </li>
        `).join('');
}

// Delete a single search entry
function deleteSearch(index) {
    const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    history.splice(index, 1);
    localStorage.setItem('searchHistory', JSON.stringify(history));
    loadSearchHistory();
}

// Clear all search history
clearHistory.addEventListener('click', () => {
    localStorage.removeItem('searchHistory');
    loadSearchHistory();
});

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Apply dark mode on page load
function applyDarkMode() {
    const isDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    if (isDarkMode) document.body.classList.add('dark-mode');
}
