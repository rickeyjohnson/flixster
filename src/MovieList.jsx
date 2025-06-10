import { useEffect, useState } from "react"
import data from "./data/data"
import { parseMovieData } from "./utils/utils"
import MovieCard from "./MovieCard"
import './MovieList.css'

const MovieList = () => {
    const movies = parseMovieData(data)
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