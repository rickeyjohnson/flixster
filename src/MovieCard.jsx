import { useState } from 'react'
import Modal from './Modal'
import './MovieCard.css'

const MovieCard = ({ movie, onFavoritesClick, isFavorited, onWatchedClick, wasWatched }) => {
    const [openModal, setOpenModal] = useState(false)

    return (
        <>
            <div className='movie-card'>
                <span onClick={onFavoritesClick} className={`star material-symbols-outlined ${isFavorited ? 'favorited' : ''}`}>star</span>
                <div onClick={() => setOpenModal(true)} className='movie-card-content'>
                    <img 
                    className='movie-poster' 
                    src={`https://image.tmdb.org/t/p/w500${movie.image_url}`} 
                    alt='poster' />
                    
                    <div className='movie-info'>
                        <h1 className='movie-title'>{movie.title}</h1>
                        <h3 className='vote-average'>Vote Average: {movie.vote_average}</h3>
                    </div>
                </div>
                <button onClick={onWatchedClick} className={`watched-icon material-symbols-outlined ${wasWatched ? 'watched' : ''}`}>{wasWatched ? 'i lied! ' : 'watched?'}</button>
            </div>
            {openModal && <Modal onClick={() => setOpenModal(false)} movie={movie}/>}
        </>
    )
}

export default MovieCard