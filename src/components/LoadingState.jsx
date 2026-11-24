export default function LoadingState({ label = 'Loading…', fullPage = false }) {
  return (
    <div className={`loading ${fullPage ? 'full' : ''}`} role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
