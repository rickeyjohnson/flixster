import { useState } from 'react'
import Modal from './Modal'
import './MovieCard.css'

const MovieCard = ({ movie }) => {
    const [openModal, setOpenModal] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const handleMouseOver = () => {
        setIsHovered(true)
    }
    const handleMouseOut = () => {
        setIsHovered(false)
    }

    return (
        <>
            <div 
            onClick={() => setOpenModal(true)}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            className='movie-card'>
                <img
                    className="movie-poster"
                    src={isHovered ? 'https://media.tenor.com/5KF3BqrpKs8AAAAM/eating-popcorn-watching-a-movie.gif' : `https://image.tmdb.org/t/p/w500${movie.image_url}`}
                    alt="poster"
                />

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