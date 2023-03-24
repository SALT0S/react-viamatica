export const getFavoritePosts = () => {
  const favoritePosts = localStorage.getItem('favorites');
  return favoritePosts ? JSON.parse(favoritePosts) : [];
};
