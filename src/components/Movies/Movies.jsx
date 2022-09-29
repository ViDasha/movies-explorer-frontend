import React from 'react';
import Header from '../Header/Header.jsx';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import Footer from '../Footer/Footer.jsx';

function Movies({loggedIn}) {
  return (
    <div className="movies">
      <Header loggedIn={loggedIn}/>
      <main className="movies__main">
        <SearchForm />
        <MoviesCardList />
      </main>
      <Footer />
    </div>
)}

export default Movies;