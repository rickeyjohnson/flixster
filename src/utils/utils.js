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

// async function getGenreNames(genre_ids) {
//     const options = {
//         'method': 'GET',
//         'headers': {
//             'accept': 'application/json',
//             'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTJhNGI5ZDFlODAzYjI4MTRkYjRkNTY1NmMwMzQzYyIsIm5iZiI6MTc0OTUwNTIzMi4zNDQsInN1YiI6IjY4NDc1NGQwNzg5ZWY1MTA5MzFlYWQwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BMZp9EdAO53TTVNUtT06TtxGQmI_22hJWc7luUKDU1s'
//         }
//     }

//     const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
//     const result = await response.json()

//     // console.log(result.genres)
//     // console.log(genre_ids)

//     result.genres.forEach(genre => {
//         const {id, name} = genre
//         if (id in genre_ids) {
//             console.log(name)
//         }
//     })

//     return []
// }

// function getGenreNames(genre_ids, genres) {
//     let names = []

//     console.log(genres)

//     // for (genre in genres) {
//     //     if (genre.id in genre_ids) {
//     //         names.push(genre.name)
//     //     }
//     // }

//     return names
// }

export { parseMovieData }