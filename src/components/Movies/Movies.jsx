import React from 'react';
import Header from '../Header/Header.jsx';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import Footer from '../Footer/Footer.jsx';

function Movies({loggedIn}) {
  return (
    <main className="movies">
      <Header loggedIn={loggedIn}/>
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </main>
)}

export default Movies;