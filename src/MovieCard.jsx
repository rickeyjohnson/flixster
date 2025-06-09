import './MovieCard.css'

const MovieCard = ({imageUrl="https://critics.io/img/movies/poster-placeholder.png", title="Movie Title", voteAverage="5"}) => {
    return (
        <div className="movie-card">
            <header>
                <img src={imageUrl} alt={title + "'s Poster Image"} />
            </header>
            <main>
                <h1>{title}</h1>
                <p>Rating: {voteAverage}</p>
            </main>
        </div>
    )
} 

export default MovieCard