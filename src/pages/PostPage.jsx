import { HeartIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';

function PostPage() {
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError('Error fetching posts');
        setIsLoading(false);
      });
  }, []);

  const handleAddFavorite = (id) => {
    const postToAdd = posts.find((post) => post.id === id);
    const postAlreadyInFavorites = favorites.some((post) => post.id === id);

    if (!postAlreadyInFavorites) {
      setFavorites((prevFavorites) => [...prevFavorites, postToAdd]);
      localStorage.setItem(
        'favorites',
        JSON.stringify([...favorites, postToAdd])
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {isLoading ? (
          <p>Loading posts...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="flow-root mt-6">
            <ul role="list" className="-my-5 divide-y divide-gray-200">
              {posts.map((post) => (
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
                    className="mt-3 text-sm flex items-center font-medium text-red-400 hover:text-red-300"
                    onClick={() => handleAddFavorite(post.id)}
                  >
                    Agregar a favoritos
                    <HeartIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostPage;
