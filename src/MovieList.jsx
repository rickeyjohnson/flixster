import { useEffect, useState } from "react"
import data from "./data/data"
import { parseMovieData } from "./utils/utils"
import MovieCard from "./MovieCard"
import './MovieList.css'

const MovieList = () => {
    const movies = parseMovieData(data)
    console.log(movies)

    return (
        <div class="movie-list">
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
        </div>
    )
}

export default MovieList