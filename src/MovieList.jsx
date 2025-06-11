import { useEffect, useState } from "react"
import { parseMovieData, sortMovies } from "./utils/utils"
import MovieCard from "./MovieCard"
import './MovieList.css'
import Modal from "./Modal"

const MovieList = ({ search }) => {

    const [sort, setSort] = useState('')
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
                movies.map((movie) => {
                    return <MovieCard movie={movie} /> 
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
        setIsDisabled(true)
        setSort('')
    }

    const handleNowPlaying = () => {
        setNowPlayingPage(1)
        setNowPlayingMovies([])
        fetchNowPlaying(1)
        setShowSearch(false)
        setIsDisabled(false)
        setSort('')
    }

    const handleSort = (event) => {
        console.log(event.target.value)
        setSort(event.target.value)
    }

    return (
        <>
            <input type='text' placeholder='Search' value={searchQuery} onChange={handleSearchChange}/>
            <button onClick={handleSearch}>search</button>
            <button onClick={handleNowPlaying}>now playing</button>

            <select onChange={handleSort} defaultValue={""}>
                <option value="label">--Sort--</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="recent">recent - oldest</option>
                <option value="oldest">oldest - recent</option>
                <option value="most-votes">most votes - least vote</option>
                <option value="least-votes">least vote - most votes</option>
            </select>

            <div className='movie-list'>
                {
                    showSearch ? renderMovies(sortMovies(searchMovies, sort)) : renderMovies(sortMovies(nowPlayingMovies, sort))
                }
                <button onClick={loadMoreMovies} disabled={isDisabled}>load more</button>
            </div>
        </>
    )
}

export default MovieList