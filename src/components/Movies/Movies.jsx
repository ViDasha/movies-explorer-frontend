import React from 'react';
import Header from '../Header/Header.jsx';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import Footer from '../Footer/Footer.jsx';

function Movies() {
  return (
    <main className="movies">
      <Header />
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </main>
)}

export default Movies;