import './MovieCard.css'

const MovieCard = ({ image_url, title, vote_average }) => {
    return (
        <div className='movie-card'>
            <img src={`https://image.tmdb.org/t/p/w500${image_url}`} alt='poster' />
            <h1>{title}</h1>
            <h3>Vote Average: {vote_average}</h3>
        </div>
    )
}

export default MovieCard