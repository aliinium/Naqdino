// Create a new AbortController instance
const controller = new AbortController();
const signal = controller.signal;

// Make the fetch request with the signal
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const imdbID = urlParams.get('id');
const urldata = "https://omdbapi.com/?apikey=1a5410af&i=" + imdbID;
const fetchPromise = fetch(urldata, { signal });

// Timeout after 5 seconds
const timeoutId = setTimeout(() => {
    controller.abort(); // Abort the fetch request
    console.log('Fetch request timed out');
}, 5000);

// Handle the fetch request
fetchPromise
    .then(response => {
        // Check if the request was successful
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Parse the response as JSON
        return response.json();
    })
    .then(data => {
        // Handle the JSON data
        document.getElementById("movieNameYear").innerHTML = data.Title + " " + data.Year,
        document.getElementById("movieDirectorName").innerHTML = data.Director,
        document.getElementById("movieGenre").innerHTML = data.Genre,
        document.getElementById("movieActors").innerHTML = data.Actors,
        document.getElementById("moviePlot").innerHTML = data.Plot,
        document.getElementById("moviePoster").src = data.Poster
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('Fetch error:', error);
    })
    .finally(() => {
        clearTimeout(timeoutId); // Clear the timeout
    });