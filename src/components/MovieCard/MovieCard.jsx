import { useState } from 'react'
import Modal from '../Modal/Modal'
import './MovieCard.css'

const MovieCard = ({
	movie,
	onFavoritesClick,
	isFavorited,
	onWatchedClick,
	wasWatched,
}) => {
	const [openModal, setOpenModal] = useState(false)

	const toggleModal = (event) => {
		if (event.target.classList.contains('close')) {
			setOpenModal(false)
		}
	}

	const handleImgLoadingError = (event) => {
		event.target.src = './public/movie-poster-placeholder.png'
	}

	return (
		<>
			<div className="movie-card">
				<span
					onClick={onFavoritesClick}
					className={`star material-symbols-outlined ${
						isFavorited ? 'favorited' : ''
					}`}
				>
					star
				</span>

				<div
					onClick={() => setOpenModal(true)}
					className="movie-card-content"
				>
					<img
						className="movie-poster"
						src={`https://image.tmdb.org/t/p/w500${movie.image_url}`}
						alt="poster"
						onError={(event) => handleImgLoadingError(event)}
					/>

					<div className="movie-info">
						<h1 className="movie-title">{movie.title}</h1>
						<h3 className="vote-average">
							Vote Average: {movie.vote_average}
						</h3>
					</div>
				</div>
				<div className="watch-btn-container">
					<button
						onClick={onWatchedClick}
						className={`watched-icon ${
							wasWatched ? 'watched' : ''
						}`}
					>
						{wasWatched ? 'Undo ' : 'Watched?'}
					</button>
				</div>
			</div>
			{openModal && (
				<Modal onClick={(event) => toggleModal(event)} movie={movie} />
			)}
		</>
	)
}

export default MovieCard
