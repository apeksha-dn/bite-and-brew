// Accessible label + control + error wrapper.
export default function FormField({ id, label, error, hint, required, children }) {
  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      <label htmlFor={id}>{label}{required && <span aria-hidden="true"> *</span>}</label>
      {children}
      {hint && !error && <small className="hint">{hint}</small>}
      {error && <small className="field-error" id={`${id}-error`} role="alert">{error}</small>}
    </div>
  );
}
