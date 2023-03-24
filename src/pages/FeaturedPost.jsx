import { HeartIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import { getFavoritePosts } from '../utils/getFavoritePosts';

function FeaturedPost() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favoritePosts = getFavoritePosts();
    setFavorites(favoritePosts);
  }, []);

  const handleRemoveFavorite = (id) => {
    const updatedFavorites = favorites.filter((post) => post.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flow-root mt-6">
          <ul role="list" className="-my-5 divide-y divide-gray-200">
            {favorites.map((post) => (
              <li key={post.id} className="py-5">
                <div className="relative focus-within:ring-2 focus-within:ring-indigo-500">
                  <h3 className="text-sm font-semibold text-gray-800">
                    {post.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                    {post.body}
                  </p>
                </div>
                <button
                  className="mt-3 text-sm flex items-center font-medium text-blue-400 hover:text-blue-300"
                  onClick={() => handleRemoveFavorite(post.id)}
                >
                  Eliminar de favoritos
                  <HeartIcon className="h-6 w-6 ml-2" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FeaturedPost;
