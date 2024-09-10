document.getElementById('searchButton').addEventListener('click', searchMovies);
document.getElementById('searchInput').addEventListener('keypress', handleKeyPress);

const apiKey = 'c3e1d0d7';

function searchMovies() {
    const query = document.getElementById('searchInput').value.trim();
    const errorMessage = document.getElementById('error-message');
    const movieResults = document.getElementById('movieResults');

    if (query) {
        fetchMovies(query);
        errorMessage.style.display = 'none';
    } else {
        showErrorMessage('enter a movie');
    }
}

async function fetchMovies(query) {
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.Response === 'True') {
            displayMovies(data.Search);
        } else {
            showErrorMessage('no movie found with this name');
        }
    } catch (error) {
        console.error('error to find movies:', error);
        showErrorMessage('help me womp womp');
    }
}

function displayMovies(movies) {
    const movieResults = document.getElementById('movieResults');
    movieResults.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        
        movieCard.innerHTML = `
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'alqsdeuss.jpg'}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
        `;
        
        movieCard.addEventListener('click', () => fetchMovieDetails(movie.imdbID));

        movieResults.appendChild(movieCard);
    });

    movieResults.classList.add('fade-in');
}

async function fetchMovieDetails(imdbID) {
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.Response === 'True') {
            displayMovieDetails(data);
        } else {
            showErrorMessage('movie details not found');
        }
    } catch (error) {
        console.error('error movie details:', error);
        showErrorMessage('help me womp womp');
    }
}

function displayMovieDetails(movie) {
    const movieDetails = document.getElementById('movieDetails');
    const movieResults = document.getElementById('movieResults');

    movieDetails.innerHTML = `
        <button class="close-btn" onclick="closeMovieDetails()">close</button>
        <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'alqsdeuss.jpg'}" alt="${movie.Title}">
        <div class="info">
            <h2>${movie.Title} (${movie.Year})</h2>
            <p><strong>ratings:</strong> ${movie.imdbRating}/10</p>
            <p><strong>runtime:</strong> ${movie.Runtime}</p>
            <p><strong>genre:</strong> ${movie.Genre}</p>
            <p><strong>director:</strong> ${movie.Director}</p>
            <p><strong>actors:</strong> ${movie.Actors}</p>
            <p><strong>language:</strong> ${movie.Language}</p>
            <p><strong>country:</strong> ${movie.Country}</p>
            <p><strong>awards:</strong> ${movie.Awards}</p>
        </div>
    `;

    movieResults.style.display = 'none';
    movieDetails.style.display = 'block';
    movieDetails.classList.add('show');
}

function closeMovieDetails() {
    const movieDetails = document.getElementById('movieDetails');
    const movieResults = document.getElementById('movieResults');

    movieDetails.style.display = 'none';
    movieResults.style.display = 'grid';
    movieDetails.classList.remove('show');
}

function showErrorMessage(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        searchMovies();
    }
}
