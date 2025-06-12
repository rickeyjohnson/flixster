import { useState } from 'react'
import './App.css'
import MovieList from './MovieList'
import Header from './Header'
import Footer from './Footer'
import { getRandomColor } from './utils/utils'

const App = () => {

  const color = getRandomColor()

  return (
      <div className="App">
          
          <Header color={color}/>
          <MovieList color={color}/>
          <Footer />
      </div>
  )
}

export default App
