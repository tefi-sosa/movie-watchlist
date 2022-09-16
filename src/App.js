import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';
import Header from './components/Header';
import MovieScreen from './components/MovieScreen';
import Watchlist from './components/Watchlist';



function App() {
  const [ movieList, setMovieList ] = useState([]);
  const [ watchList, setWatchList ] = useState([]);
  const [ page, setPage ] = useState(1);

  const getData = () => {
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`)
      .then((res) => {
        // console.log(res.data.results);
        setWatchList(res.data.results);
      })
  }

  useEffect(() => {
    getData()
  }, [page])

  const addMovie = (movie) => {
    setMovieList([...movieList, movie])
    // console.log(movieList)
  }



  const removeMovie = (movie) => {
    let newState = movieList.filter((mov) => {
      return mov !== movie
    })
    setMovieList(newState)
  }

  return (
    <div className="App">
      <Header />
      <main>
        <MovieScreen
        addMovie={addMovie}
        list={movieList}
        page={page}
        setPage={setPage}
        watchList={watchList}
        removeMovie={removeMovie}
        />
        <Watchlist list={movieList} removeMovie={removeMovie} />
      </main>
    </div>
  );
}

export default App;
