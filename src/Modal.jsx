import { useEffect, useState } from "react"
import './Modal.css'

const Modal = ({ movie, onClick }) => {
    const [genres, setGenres] = useState([])

    // const style = {
    //     'background-image': `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`
    // }

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

    const printDate = () => {
        const date = new Date(movie.release_date)
        return date.toDateString()
    }

    useEffect(() => {
        fetchGenreName(movie.genre_ids)
    }, [])

    return (
        <div className="modal-overlay">
            <div className="modal-content" >
                <span onClick={onClick} class="close-btn material-symbols-outlined">close</span>
                <h2>{movie.title}</h2>

                <div className="images">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.image_url}`} alt='poster' />
                    <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt='poster' />
                </div>
    
                <p><strong>Release Date: </strong>{printDate()}</p>
                <p><strong>Overview: </strong>{movie.overview}</p>
                <p><strong>Genres:</strong> 
                    {
                        genres.map(genre => {
                            return ` ${genre}, ` 
                        })
                    }
                </p>
            </div>
        </div>
    )
}

export default Modal