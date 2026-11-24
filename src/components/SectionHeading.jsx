export default function SectionHeading({ eyebrow, title, text, align = 'center', as: Tag = 'h2' }) {
  return (
    <div className={`section-heading ${align === 'left' ? 'left' : ''}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Tag>{title}</Tag>
      {text && <p>{text}</p>}
    </div>
  );
}
