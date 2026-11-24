import { Link } from 'react-router-dom';

export default function EmptyState({ icon, title, text, actionLabel, actionTo, onAction }) {
  return (
    <div className="empty-state">
      {icon && <div className="empty-icon">{icon}</div>}
      <h3>{title}</h3>
      {text && <p>{text}</p>}
      {actionTo && <Link to={actionTo} className="btn btn-primary">{actionLabel}</Link>}
      {onAction && !actionTo && <button className="btn btn-primary" onClick={onAction}>{actionLabel}</button>}
    </div>
  );
}
