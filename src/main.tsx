import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import NotFound from './NotFound.tsx';
import './index.css';

function Root() {
  const path = window.location.pathname;
  if (path !== '/' && path !== '') {
    return <NotFound />;
  }
  return <App />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
