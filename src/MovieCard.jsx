import { useState } from 'react'
import Modal from './Modal'
import './MovieCard.css'

const MovieCard = ({ movie }) => {
    const [openModal, setOpenModal] = useState(false)

    return (
        <>
            <div onClick={() => setOpenModal(true)} className='movie-card'>
                <img 
                className='movie-poster' 
                src={`https://image.tmdb.org/t/p/w500${movie.image_url}`} 
                alt='poster' />
                
                <div className='movie-info'>
                    <h1 className='movie-title'>{movie.title}</h1>
                    <h3 className='vote-average'>Vote Average: {movie.vote_average}</h3>
                </div>
                
            </div>
            {openModal && <Modal onClick={() => setOpenModal(false)} movie={movie}/>}
        </>
    )
}

export default MovieCard