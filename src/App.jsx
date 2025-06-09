import { useState } from 'react'
import './App.css'
import MovieList from './MovieList'

const App = () => {
  return (
    <div className="App">
      <h1>Movies!</h1>
      <MovieList />
    </div>
  )
}

export default App
