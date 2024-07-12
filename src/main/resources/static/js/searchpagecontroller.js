// Create a new AbortController instance
const controller = new AbortController();
const signal = controller.signal;

// Make the fetch request with the signal
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const search = urlParams.get('s');
encodeURIComponent(search).replace(/%20/g, "+");
const urldata = "https://omdbapi.com/?apikey=1a5410af&s=" + search;
const fetchPromise = fetch(urldata, { signal });

fetch(urldata)
    .then(response => response.json())
    .then(data => {
        if (data.Response === "True") {
            const results = data.Search;
            const container = document.querySelector('.row.px-4.px-lg-5.searchItemBody');

            results.forEach(result => {
                const itemContent = document.createElement('div');
                itemContent.className = 'col searchItemContent';

                const link = document.createElement('a');
                link.id = 'searchItemLink';
                link.href = `movie?id=${result.imdbID}`;

                const poster = document.createElement('img');
                poster.className = 'searchItemPoster';
                poster.id = 'searchItemPoster';
                poster.src = result.Poster;

                const name = document.createElement('div');
                name.className = 'searchItemName';
                name.id = 'searchItemName';
                name.textContent = result.Title;

                link.appendChild(poster);
                link.appendChild(name);
                itemContent.appendChild(link);
                container.appendChild(itemContent);
            });
        } else {
            console.error('No results found');
        }
    })
    .catch(error => console.error('Error fetching data:', error));