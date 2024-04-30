import { createContext, useState, useEffect, useContext } from 'react';
import createRandomPost from './randomPost';

// 1. Create a context
const ActionsContext = createContext();

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
    <ActionsContext.Provider
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
    </ActionsContext.Provider>
  );
};

// Major actions in this app is post and search
const useActions = function () {
  const context = useContext(ActionsContext);
  if (context === undefined)
    throw new Error('ActionsContext was used outside of the Provider');
  return context;
};

export { Provider, useActions };
