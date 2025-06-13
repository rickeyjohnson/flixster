import { useEffect, useState } from 'react'
import { parseMovieData, sortMovies } from '../../utils/utils'
import MovieCard from '../MovieCard/MovieCard'
import './MovieList.css'
import Sidebar from '../Sidebar/Sidebar'
import { render } from 'react-dom'

const MovieList = ({ color }) => {
	const [sort, setSort] = useState('')
	const [nowPlayingMovies, setNowPlayingMovies] = useState([])
	const [searchMovies, setSearchMovies] = useState([])
	const [nowPlayingPage, setNowPlayingPage] = useState(1)
	const [isDisabled, setIsDisabled] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const [showSearch, setShowSearch] = useState(false)
	const [showFavorites, setShowFavorites] = useState(false)
	const [showWatched, setShowWatched] = useState(false)
	const [favorites, setFavorites] = useState([])
	const [watched, setWatched] = useState([])
	const [showSidebar, setShowSidebar] = useState(false)

	useEffect(() => {
		fetchNowPlaying(nowPlayingPage)
	}, [])

	const fetchNowPlaying = async (page) => {
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTJhNGI5ZDFlODAzYjI4MTRkYjRkNTY1NmMwMzQzYyIsIm5iZiI6MTc0OTUwNTIzMi4zNDQsInN1YiI6IjY4NDc1NGQwNzg5ZWY1MTA5MzFlYWQwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BMZp9EdAO53TTVNUtT06TtxGQmI_22hJWc7luUKDU1s',
			},
		}

		const response = await fetch(
			`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`,
			options
		)
		const result = await response.json()
		const data = parseMovieData(result)

		setIsDisabled(data.length < 20)
		setNowPlayingMovies((prevMovies) => [...prevMovies, ...data])
		setNowPlayingPage(page + 1)
	}

	const fetchSearchMovies = async (searchQuery) => {
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTJhNGI5ZDFlODAzYjI4MTRkYjRkNTY1NmMwMzQzYyIsIm5iZiI6MTc0OTUwNTIzMi4zNDQsInN1YiI6IjY4NDc1NGQwNzg5ZWY1MTA5MzFlYWQwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BMZp9EdAO53TTVNUtT06TtxGQmI_22hJWc7luUKDU1s',
			},
		}

		const response = await fetch(
			`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`,
			options
		)
		const result = await response.json()
		const data = parseMovieData(result)

		setSearchMovies(data)
	}

	const loadMoreMovies = (event) => {
		fetchNowPlaying(nowPlayingPage)
		event.preventDefault()
	}

	const loadFavoriteMovies = () => {
		renderMovies(favorites)
	}

	const loadWatchedMovies = () => {
		renderMovies(watched)
	}

	const renderPage = () => {
		if (showSearch) {
			return renderMovies(sortMovies(searchMovies, sort))
		} else if (showFavorites) {
			return renderMovies(sortMovies(favorites, sort))
		} else if (showWatched) {
			return renderMovies(sortMovies(watched, sort))
		} else {
			return renderMovies(sortMovies(nowPlayingMovies, sort))
		}
	}

	const renderMovies = (movies) => {
		return (
			<>
				{movies.map((movie) => {
					return (
						<MovieCard
							movie={movie}
							onFavoritesClick={() => handleAddToFavorites(movie)}
							onWatchedClick={() => onWatchedClick(movie)}
							isFavorited={isFavorite(movie)}
							wasWatched={wasWatched(movie)}
						/>
					)
				})}
			</>
		)
	}

	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value)
	}

	const handleSearch = () => {
		if (!searchQuery) {
			return
		}
		fetchSearchMovies(searchQuery)
		setShowSearch(true)
		setShowFavorites(false)
		setShowWatched(false)
		setIsDisabled(true)
		setSort('')
	}

	const handleNowPlaying = () => {
		setNowPlayingPage(1)
		setNowPlayingMovies([])
		fetchNowPlaying(1)
		setShowSearch(false)
		setShowFavorites(false)
		setShowWatched(false)
		setIsDisabled(false)
		setSort('')
	}

	const handleSort = (event) => {
		setSort(event.target.value)
	}

	const handleAddToFavorites = (movie) => {
		const exist = isFavorite(movie)

		if (exist) {
			setFavorites(favorites.filter((fav) => fav.id !== movie.id))
		} else {
			setFavorites([...favorites, movie])
		}
	}

	const onWatchedClick = (movie) => {
		const exist = wasWatched(movie)

		if (exist) {
			setWatched(watched.filter((watch) => watch.id !== movie.id))
		} else {
			setWatched([...watched, movie])
		}
	}

	const handleFavoriteClick = () => {
		console.log('clicked!')
		setShowFavorites(true)
		setShowSearch(false)
		setShowWatched(false)
		setIsDisabled(true)
		setSort('')
	}

	const handleWatchedClick = () => {
		setShowFavorites(false)
		setShowSearch(false)
		setShowWatched(true)
		setIsDisabled(true)
		setSort('')
	}

	const isFavorite = (movie) => favorites.some((fav) => fav.id === movie.id)
	const wasWatched = (movie) => watched.some((watch) => watch.id === movie.id)

	return (
		<main>
			<nav>
				<div
					onClick={() => setShowSidebar(!showSidebar)}
					className="material-symbols-outlined sidebar-toggle"
				>
					menu
				</div>

				<div className="search">
					<input
						type="text"
						placeholder="Search"
						value={searchQuery}
						onChange={handleSearchChange}
					/>
					<button className="search-btn" onClick={handleSearch}>
						search
					</button>
					<button
						className="now-playing-btn"
						onClick={handleNowPlaying}
					>
						now playing
					</button>
				</div>

				<div className="sort-selector">
					<select onChange={handleSort} defaultValue={''}>
						<option value="label">--Sort--</option>
						<option value="A-Z">A-Z</option>
						<option value="Z-A">Z-A</option>
						<option value="recent">recent - oldest</option>
						<option value="oldest">oldest - recent</option>
						<option value="most-votes">
							highest - lowest
						</option>
						<option value="least-votes">
							lowest - highest
						</option>
					</select>
				</div>
			</nav>

			<section>
				{showSidebar && (
					<Sidebar
						color={color}
						favorites={favorites}
						watched={watched}
						onFavoritesClick={handleFavoriteClick}
						onWatchedClick={handleWatchedClick}
					/>
				)}
				<div
					className={`movie-list ${
						showSidebar ? 'sidebar-displayed' : ''
					}`}
				>
					{/* {showSearch
						? renderMovies(sortMovies(searchMovies, sort))
						: renderMovies(sortMovies(nowPlayingMovies, sort))} */
						renderPage()
					}
				</div>
			</section>

			<div className="load-more-container">
				<button
					className={`load-more-btn ${isDisabled ? 'disabled' : ''}`}
					onClick={loadMoreMovies}
					disabled={isDisabled}
				>
					load more
				</button>
			</div>
		</main>
	)
}

export default MovieList
