import ReactDOM from 'react-dom/client';
import App from './App';
import '@/assets/styles/common.less';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
);

if (import.meta.hot) {
  // react refresh 失效时强刷页面
  import.meta.hot.on('vite:invalidate', () => {
    window.location.reload();
  });
}
