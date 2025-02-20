import React from 'react';
import ReactDOM from 'react-dom/client';
import BookmarkApp from './Bookmark';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BookmarkApp />
  </React.StrictMode>
);

reportWebVitals();