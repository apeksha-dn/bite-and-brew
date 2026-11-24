import { Link } from 'react-router-dom';
import useDocumentMeta from '../hooks/useDocumentMeta';

export default function NotFound() {
  useDocumentMeta('Page not found');
  return (
    <div className="container empty-state" style={{ padding: '100px 0' }}>
      <span className="eyebrow">Error 404</span>
      <h1 style={{ fontSize: 'clamp(36px, 6vw, 56px)', color: 'var(--espresso)' }}>Page not found</h1>
      <p>The page you are looking for doesn’t exist or has moved.</p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
  );
}
