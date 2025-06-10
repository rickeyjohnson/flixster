import { useEffect, useState } from "react"
import data from "./data/data"
import { parseMovieData } from "./utils/utils"
import MovieCard from "./MovieCard"
import './MovieList.css'

const MovieList = () => {
    const [movies, setMovies] = useState(null)

    useEffect(() => {
        async function fetchData() {
            const options = {
                'method': 'GET',
                'headers': {
                    'accept': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTJhNGI5ZDFlODAzYjI4MTRkYjRkNTY1NmMwMzQzYyIsIm5iZiI6MTc0OTUwNTIzMi4zNDQsInN1YiI6IjY4NDc1NGQwNzg5ZWY1MTA5MzFlYWQwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BMZp9EdAO53TTVNUtT06TtxGQmI_22hJWc7luUKDU1s'
                }
            }

            try {
                const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
                const data = await response.json()
                
                setMovies(parseMovieData(data))
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()

    }, [])

    console.log(movies)

    return (
        <div className="movie-list">
            {
                movies.map((movie) => {
                    return <MovieCard id={movie.id} imageUrl={movie.image_url} title={movie.title} voteAverage={movie.vote_average} />
                })
            }
        </div>
    )
}

export default MovieList