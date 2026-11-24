import { useEffect } from 'react';
import { siteConfig } from '../data/siteConfig';

// Sets <title> and meta description per page.
export default function useDocumentMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} — ${siteConfig.tagline}`;
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', 'description');
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', description || siteConfig.description);
  }, [title, description]);
}
