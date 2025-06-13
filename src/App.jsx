import './App.css'
import MovieList from './components/MovieList/MovieList'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { getRandomColor } from './utils/utils'

const App = () => {
	const color = getRandomColor()

	return (
		<div className="App">
			<Header color={color} />
			<MovieList color={color} />
			<Footer />
		</div>
	)
}

export default App