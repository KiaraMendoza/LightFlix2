const fetchMovies = async (loggedUser, moviePage) => {
    // ExampleUrl: 'https://api.themoviedb.org/4/list/{list_id}?page=1&api_key=<<api_key>>';
    let url = 'https://api.themoviedb.org/4/list/1?page=' + moviePage + '&api_key=' + loggedUser.apiKey;

    return await fetch(url)
        .then(res => {
            console.log(res.status);
            if (res.status < 200 || res.status >= 300) {
                console.log(res.statusText);
                throw new Error('HTTP Error ' + res.status);
            }
            return res.json();
        })
        .then(data => data)
        .catch(err => alert(err.message))
}

export default fetchMovies;