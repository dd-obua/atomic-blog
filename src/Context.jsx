import { createContext, useState, useEffect } from 'react';
import createRandomPost from './randomPost';

// 1. Create a context
const Context = createContext();

const Provider = function ({ children }) {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [isFakeDark, setIsFakeDark] = useState(false);

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : posts;

  const handleAddPost = (post) => setPosts((posts) => [...posts, post]);
  const handleClearPosts = () => setPosts([]);

  useEffect(
    function () {
      document.documentElement.classList.toggle('fake-dark-mode');
    },
    [isFakeDark]
  );

  return (
    <Context.Provider
      value={{
        posts: searchedPosts,
        onAddPost: handleAddPost,
        onClearPosts: handleClearPosts,
        searchQuery,
        setSearchQuery,
        isFakeDark,
        setIsFakeDark,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, Provider };
