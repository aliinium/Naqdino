// Make the fetch request with the signal
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const search = urlParams.get('s');
encodeURIComponent(search).replace(/%20/g, "+");
const urldata = "https://omdbapi.com/?apikey=1a5410af&s=" + search;

fetch(urldata)
    .then(response => response.json())
    .then(data => {
        if (data.Response === "True") {
            const results = data.Search;
            const container = document.querySelector('.row.px-4.px-lg-5.searchItemBody');

            results.forEach(result => {
                if (result.Poster !== "N/A") {
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
                    name.textContent = result.Title + " (" + result.Year + ")";

                    link.appendChild(poster);
                    link.appendChild(name);
                    itemContent.appendChild(link);
                    container.appendChild(itemContent);
                }
            });
        } else {
            const container = document.querySelector('.row.px-4.px-lg-5.searchItemBody');
            const itemContent = document.createElement('div');
            itemContent.className = 'col searchItemContent';
            itemContent.textContent = 'نتیجه‌ای یافت نشد.';

            container.appendChild(itemContent);
        }
    })
    .catch(error => {
        const container = document.querySelector('.row.px-4.px-lg-5.searchItemBody');
        const itemContent = document.createElement('div');
        itemContent.className = 'col searchItemContent';
        itemContent.textContent = error.toString();

        container.appendChild(itemContent);

        console.error('Error fetching data:', error)
    });