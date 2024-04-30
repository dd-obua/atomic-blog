import { useState } from 'react';
import createRandomPost from './randomPost';
import { useActions, Provider } from './Context';

const App = function () {
  return (
    // 2. Provide value to child components
    <Provider>
      <section>
        <ModeBtn />
        <Header />
        <Main />
        <Archive />
        <Footer />
      </section>
    </Provider>
  );
};

const ModeBtn = function () {
  const { isFakeDark, setIsFakeDark } = useActions();

  return (
    <button
      onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)}
      className="btn-fake-dark-mode"
    >
      {isFakeDark ? '☀️' : '🌙'}
    </button>
  );
};

const Header = function () {
  // 3. Consume context value
  const { onClearPosts } = useActions();

  return (
    <header>
      <h1>
        <span>⚛️</span>The Atomic Blog
      </h1>
      <div>
        <Results />
        <SearchPosts />
        <button onClick={onClearPosts}>Clear posts</button>
      </div>
    </header>
  );
};

const SearchPosts = function () {
  const { searchQuery, setSearchQuery } = useActions();

  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search posts..."
    />
  );
};

const Results = function () {
  const { posts } = useActions();
  return <p>🚀 {posts.length} atomic posts found</p>;
};

const Main = function () {
  return (
    <main>
      <FormAddPost />
      <Posts />
    </main>
  );
};

const Posts = () => {
  return (
    <section>
      <List />
    </section>
  );
};

const FormAddPost = function () {
  const { onAddPost } = useActions();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = function (e) {
    e.preventDefault();
    if (!body || !title) return;
    onAddPost({ title, body });
    setTitle('');
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Post body"
      />
      <button>Add post</button>
    </form>
  );
};

const List = function () {
  const { posts } = useActions();

  return (
    <ul>
      {posts.map((post, i) => (
        <li key={i}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
};

const Archive = function () {
  const { onAddPost } = useActions();

  // Here we don't need the setter function. We're only using state to store these posts because the callback function passed into useState (which generates the posts) is only called once, on the initial render. So we use this trick as an optimization technique, because if we just used a regular variable, these posts would be re-created on every render. We could also move the posts outside the components, but I wanted to show you this trick 😉
  const [posts] = useState(() =>
    // 💥 WARNING: This might make your computer slow! Try a smaller `length` first
    Array.from({ length: 10000 }, () => createRandomPost())
  );

  const [showArchive, setShowArchive] = useState(false);

  return (
    <aside>
      <h2>Post archive</h2>
      <button onClick={() => setShowArchive((s) => !s)}>
        {`${showArchive ? 'Hide' : 'Show'} archive posts`}
      </button>

      {showArchive && (
        <ul>
          {posts.map((post, i) => (
            <li key={i}>
              <p>
                <strong>{post.title}:</strong> {post.body}
              </p>
              <button onClick={() => onAddPost(post)}>Add as new post</button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

const Footer = () => <footer>&copy; by The Atomic Blog ✌️</footer>;

export default App;
