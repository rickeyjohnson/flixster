import './Sidebar.css'

const Sidebar = ({
	color,
	favorites,
	watched,
	onFavoritesClick,
	onWatchedClick,
}) => {
	const style = {
		'background-color': `${color}45`,
	}

	const displayMovies = (movies) => {
		return (
			<>
				{movies.map((movie) => {
					return <li>{movie.title}</li>
				})}
			</>
		)
	}

	return (
		<div className="sidebar">
			<div className="sidebar-content" style={style}>
				<h1>WOAH WHAT AN AMAZING SIDEBAR!</h1>

				<h2
					onClick={onFavoritesClick}
					className="favorite-sidebar-btn sidebar-btn"
				>
					Favorites 🌟
				</h2>

				<h2
					onClick={onWatchedClick}
					className="watched-sidebar-btn sidebar-btn"
				>
					Watched 🍿
				</h2>
			</div>
		</div>
	)
}

export default Sidebar
