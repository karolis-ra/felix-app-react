const INITIAL_STATE = {
  movies: [],
  favorites: JSON.parse(localStorage.getItem('favoriteMovies')) || [],
  token: null,
  logged: null,
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_MOVIES':
        console.log('this is action movies', action.movies)
      return {
        ...state,
        movies: action.movies,
      };
    case 'REMOVE_FAVORITE':
      const remove_favs = {
        ...state,
        favorites: state.favorites.filter((id) => id !== action.id),
      };
      localStorage.setItem(
        'favoriteMovies',
        JSON.stringify(remove_favs.favorites)
      );
      return remove_favs;
    case 'ADD_FAVORITE':
      const add_favs = {
        ...state,
        favorites: state.favorites.concat(action.id),
      };
      localStorage.setItem(
        'favoriteMovies',
        JSON.stringify(add_favs.favorites)
      );
      return add_favs;

    default:
      return state;
  }
}



export default reducer;
