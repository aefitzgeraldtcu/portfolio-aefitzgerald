let allQuotes = []
const quoteButton = document.getElementById('new-quote-btn');

function displayRandomQuote() {
    const display = document.getElementById('quotes-display');
    if (allQuotes.length === 0) {
        display.innerHTML = `<p class="widget-error">No quotes to show.</p>`;
        return;
    }
    const randomIndex = Math.floor(Math.random() * allQuotes.length);
    const quote = allQuotes[randomIndex];
    display.innerHTML = `
        <div class="quote-card">
            <div class="quote-text">"${quote.text}"</div>
            <div class="quote-author">— ${quote.author}</div>
        </div>`;
}

quoteButton.addEventListener('click', displayRandomQuote);

function loadWeather() {
    fetch('./data/weather.json')
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => {
            console.error('Error loading weather:', error);
            displayWeatherError();
        });
}

function displayWeather(weather) {
    document.getElementById('weather-display').innerHTML = `
        <div class="weather-current">
            <div class="weather-icon">${weather.icon}</div>
            <div class="weather-temp">${weather.temperature}°F</div>
            <div class="weather-location">${weather.location}</div>
            <div class="weather-condition">${weather.condition}</div>
        </div>`;
}
function displayWeatherError() {
    document.getElementById('weather-display').innerHTML =
        `<p class="widget-error">Weather data is unavailable right now.</p>`;
}

loadWeather();

function initializeTheme() {
    if (localStorage.getItem('dashboardTheme') === 'dark') {
        document.body.classList.add('theme-dark');
    }
}
function toggleTheme() {
    const isDark = document.body.classList.toggle('theme-dark');
    if (isDark) {
        localStorage.setItem('dashboardTheme', 'dark');
    } else {
        localStorage.setItem('dashboardTheme', 'light');
    }
}
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
initializeTheme();

function loadQuotes() {
    fetch('./data/quotes.json')
        .then(response => response.json())
        .then(data => {
            allQuotes = data;
            displayRandomQuote();
        if (allQuotes.length > 0) {
            quoteButton.disabled = false;
        }
   })
        .catch(error => {
            console.error('Error loading quote:', error);
            displayQuotesError();
        });
}

function displayQuotesError() {
    document.getElementById('quotes-display').innerHTML =
        `<p class="widget-error">Quote data is unavailable right now.</p>`;
}
loadQuotes();