import { useEffect, useState } from "react"
import './Modal.css'

const Modal = ({ movie, onClick }) => {
    const [genres, setGenres] = useState([])

    const fetchGenreName = async (genre_ids) => {
        let genreNames = []
        let genresDict = {}

        const options = {
            'method': 'GET',
            'headers': {
                'accept': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTJhNGI5ZDFlODAzYjI4MTRkYjRkNTY1NmMwMzQzYyIsIm5iZiI6MTc0OTUwNTIzMi4zNDQsInN1YiI6IjY4NDc1NGQwNzg5ZWY1MTA5MzFlYWQwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BMZp9EdAO53TTVNUtT06TtxGQmI_22hJWc7luUKDU1s'
            }
        }

        const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
        const result = await response.json()
        const genres = result.genres

        for (const genre of genres) {
            genresDict[genre.id] = genre.name
        }

        for (const genre_id of genre_ids) {
            genreNames.push(genresDict[genre_id])
        }

        setGenres(genreNames)
    }

    useEffect(() => {
        fetchGenreName(movie.genre_ids)
    }, [])

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{movie.title}</h2>
                <img src={`https://image.tmdb.org/t/p/w500${movie.image_url}`} alt='poster' />
                <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt='poster' />
                <p><strong>Release Date: {movie.release_date}</strong></p>
                <p><strong>Overview: {movie.overview}</strong></p>
                <p><strong>Genres:</strong> 
                    {
                        genres.map(genre => {
                            return `${genre}, ` 
                        })
                    }
                </p>
                <button onClick={onClick}>close</button>
            </div>
        </div>
    )
}

export default Modal