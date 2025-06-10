import { useEffect, useState } from "react"
import { parseMovieData } from "./utils/utils"
import MovieCard from "./MovieCard"
import './MovieList.css'

const MovieList = ({ search }) => {

    const [nowPlayingMovies, setNowPlayingMovies] = useState([])
    const [searchMovies, setSearchMovies] = useState([])
    const [nowPlayingPage, setNowPlayingPage] = useState(1)
    const [searchPage, setSearchPage] = useState(1)
    const [isDisabled, setIsDisabled] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [showSearch, setShowSearch] = useState(false)

    useEffect(() => {
        fetchNowPlaying(nowPlayingPage)
    }, [])
    
    const fetchNowPlaying = async (page) => {
        const options = {
            'method': 'GET',
            'headers': {
                'accept': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTJhNGI5ZDFlODAzYjI4MTRkYjRkNTY1NmMwMzQzYyIsIm5iZiI6MTc0OTUwNTIzMi4zNDQsInN1YiI6IjY4NDc1NGQwNzg5ZWY1MTA5MzFlYWQwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BMZp9EdAO53TTVNUtT06TtxGQmI_22hJWc7luUKDU1s'
            }
        }

        const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`, options)
        const result = await response.json()
        const data = parseMovieData(result)

        setIsDisabled(data.length < 20)
        setNowPlayingMovies(prevMovies => [...prevMovies, ...data])
        setNowPlayingPage(page + 1)
    }

    const fetchSearchMovies = async (searchQuery) => {
        const options = {
            'method': 'GET',
            'headers': {
                'accept': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTJhNGI5ZDFlODAzYjI4MTRkYjRkNTY1NmMwMzQzYyIsIm5iZiI6MTc0OTUwNTIzMi4zNDQsInN1YiI6IjY4NDc1NGQwNzg5ZWY1MTA5MzFlYWQwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BMZp9EdAO53TTVNUtT06TtxGQmI_22hJWc7luUKDU1s'
            }
        }

        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`, options)
        const result = await response.json()
        const data = parseMovieData(result)

        setSearchMovies(data)
    }

    const loadMoreMovies = () => {
        fetchNowPlaying(nowPlayingPage)
    }

    const renderMovies = (movies) => {
        return (
            <>
            {
                movies.map(movie => {
                    return <MovieCard image_url={movie.image_url} title={movie.title} vote_average={movie.vote_average} /> 
                })
            }
            </>
        )
    }

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value)
    }

    const handleSearch = () => {
        if (!searchQuery) { return }
        fetchSearchMovies(searchQuery)
        setShowSearch(true)
    }

    // const handleNowPlaying = () => {
        
    // }

    return (
        <>
            <input type='text' placeholder='Search' value={searchQuery} onChange={handleSearchChange}/>
            <button onClick={handleSearch}>search</button>
            <button onClick={handleNowPlaying}>now playing</button>

            <div className='movie-list'>
                {
                    showSearch ? renderMovies(searchMovies) : renderMovies(nowPlayingMovies)
                }
                <button onClick={loadMoreMovies} disabled={isDisabled}>load more</button>
            </div>
        </>
    )
}

export default MovieList