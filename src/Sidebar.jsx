import './Sidebar.css'

const Sidebar = ({color, favorites, watched}) => {
    const style = {
        'background-color' : `${color}45`
    }

    const displayMovies = (movies) => {
        return (
            <>
            {
                movies.map(movie => {
                    return <li>{movie.title}</li>
                })
            }
            </>
        )
    }

    return (
        <div className='sidebar'>
            <div className='sidebar-content' style={style}>
                <h1>WOAH WHAT AN AMAZING SIDEBAR!</h1>
                
                <h2>Favorites 🌟</h2>

                <div className='favorites-list'>
                    {favorites.length > 0 ? <ul>{displayMovies(favorites)}</ul> : <p>No favorites here to see</p>}
                </div>

                <h2>Watched 🍿</h2>
                <div className='watched-list'>
                    {watched.length > 0 ? displayMovies(watched) : <p>Go watch some movies</p>}
                </div>
            </div>
        </div>
    )
}

export default Sidebar