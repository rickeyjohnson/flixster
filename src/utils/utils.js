function parseMovieData(data) {
    let movies = []

    data.results.forEach(movie => {
        movies.push(
            {
                "id": movie.id,
                "backdrop_path": movie.backdrop_path,
                "title": movie.title,
                "poster_path": movie.poster_path,
                "release_date": movie.release_date,
                "overview": movie.overview,
                "vote_average": movie.vote_average
            }
        )
    })

    return movies
}

export { parseMovieData }