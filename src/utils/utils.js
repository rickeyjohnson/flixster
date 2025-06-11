function parseMovieData(data) {
    let movies = []

    data.results.forEach(movie => {
        movies.push(
            {
                "id": movie.id,
                "backdrop_path": movie.backdrop_path,
                "title": movie.title,
                "image_url": movie.poster_path,
                "release_date": movie.release_date,
                "overview": movie.overview,
                "vote_average": movie.vote_average,
                "genre_ids": movie.genre_ids
            }
        )
    })

    return movies
}

function sortMovies(movies, sort) {
    let sortedMovies;

    switch(sort) {
        case 'A-Z':
            sortedMovies = movies.sort((a, b) => a.title.toUpperCase().charCodeAt(0) - b.title.toUpperCase().charCodeAt(0))
            break;
        case 'Z-A':
            sortedMovies = movies.sort((a, b) => b.title.toUpperCase().charCodeAt(0) - a.title.toUpperCase().charCodeAt(0))
            break;
        case 'recent':
            sortedMovies = movies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
            break;
        case 'oldest':
            sortedMovies = movies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date))
            break;
        case 'most-votes':
            sortedMovies = movies.sort((a, b) => b.vote_average - a.vote_average)
            break;
        case 'least-votes':
            sortedMovies = movies.sort((a, b) => a.vote_average - b.vote_average)
            break;
        default:
            sortedMovies = movies
            break;
    }

    return sortedMovies
}

export { parseMovieData, sortMovies }