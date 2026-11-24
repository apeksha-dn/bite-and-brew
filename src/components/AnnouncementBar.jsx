import { siteConfig } from '../data/siteConfig';
import { BadgePercent } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="announcement" role="note">
      <BadgePercent size={16} aria-hidden="true" />
      <span>{siteConfig.announcement}</span>
    </div>
  );
}
