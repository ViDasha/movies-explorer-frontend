import React from 'react';
import Header from '../Header/Header.jsx';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import Footer from '../Footer/Footer.jsx';

function SavedMovies() {
  return (
    <main className="savedmovies">
      <Header />
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </main>
)}

export default SavedMovies;