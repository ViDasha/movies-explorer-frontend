import React from 'react';
import Header from '../Header/Header.jsx';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import Footer from '../Footer/Footer.jsx';

function SavedMovies({loggedIn}) {
  return (
    <main className="savedmovies">
      <Header loggedIn={loggedIn}/>
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </main>
)}

export default SavedMovies;