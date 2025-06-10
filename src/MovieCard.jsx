import { useState } from 'react'
import Modal from './Modal'
import './MovieCard.css'

const MovieCard = ({ movie }) => {
    const [openModal, setOpenModal] = useState(false)

    const handleModalClick = (event) => {
        console.log('hi')
    }

    return (
        <>
            <div onClick={() => setOpenModal(true)}className='movie-card'>
                <img src={`https://image.tmdb.org/t/p/w500${movie.image_url}`} alt='poster' />
                <h1>{movie.title}</h1>
                <h3>Vote Average: {movie.vote_average}</h3>
                {/* <p>{movie.genres}</p> */}
            </div>
            {openModal && <Modal onClick={() => setOpenModal(false)} movie={movie}/>}
        </>
    )
}

export default MovieCard