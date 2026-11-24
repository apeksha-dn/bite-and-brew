import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import SmartImage from '../components/SmartImage';
import Icon from '../components/Icon';
import Reveal from '../components/Reveal';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { siteConfig } from '../data/siteConfig';
import { reasons, team, values } from '../data/content';

export default function About() {
  useDocumentMeta('Our Story', `The story, philosophy and people behind ${siteConfig.name}: fresh ingredients, honest cooking and warm hospitality.`);
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">About us</span>
          <h1>Good Food. Good Mood.</h1>
          <p>The story, the philosophy and the people behind {siteConfig.name}.</p>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <Reveal className="split-copy">
            <span className="eyebrow">Brand story</span>
            <h2>It started with a table and a simple idea</h2>
            <p>{siteConfig.name} began as a dream of a neighbourhood café where nobody has to choose between great food and a great atmosphere. A place for a quick morning coffee, a long family lunch or a late-night shake with friends.</p>
            <p>We cook the dishes we grew up loving, from stacked burgers and bubbling pizzas to butter chicken and warm brownies, and we make them with care, every single time.</p>
            <p><em>(Placeholder story. Replace this copy with the café’s real founding story.)</em></p>
          </Reveal>
          <Reveal className="split-media">
            <SmartImage name="interior2" alt="Inside the café with warm lighting and wooden tables" w={900} h={970} />
            <SmartImage name="prep1" alt="Chef preparing a dish in the kitchen" w={400} h={400} className="accent" />
          </Reveal>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHeading eyebrow="Our philosophy" title="What We Believe" text="Four simple principles guide everything that comes out of our kitchen." />
          <div className="feature-grid">
            {values.map((v) => (
              <div className="feature" key={v.title}>
                <div className="f-icon"><Icon name={v.icon} size={26} /></div>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split reverse">
          <Reveal className="split-copy">
            <span className="eyebrow">Fresh ingredients</span>
            <h2>Our commitment to quality</h2>
            <p>Great cooking starts long before the stove is lit. We choose ingredients for freshness first and work with trusted local suppliers wherever we can.</p>
            <ul className="check-list">
              <li><Check size={18} aria-hidden="true" /> Vegetables and herbs delivered fresh each morning</li>
              <li><Check size={18} aria-hidden="true" /> Doughs, sauces and desserts made in-house</li>
              <li><Check size={18} aria-hidden="true" /> Coffee beans roasted in small batches</li>
              <li><Check size={18} aria-hidden="true" /> Clear veg and non-veg labelling on every dish</li>
            </ul>
            <Link to="/menu" className="btn btn-primary">Taste the Menu</Link>
          </Reveal>
          <Reveal className="split-media">
            <SmartImage name="spread" alt="A table spread with fresh dishes" w={900} h={970} />
          </Reveal>
        </div>
      </section>

      <section className="section dark">
        <div className="container">
          <SectionHeading eyebrow="Why guests love us" title="The Little Things That Add Up" />
          <div className="feature-grid">
            {reasons.map((r) => (
              <div className="feature" key={r.title}>
                <div className="f-icon"><Icon name={r.icon} size={26} /></div>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="The team" title="Meet the People Behind the Plates" text="Placeholder profiles. Add your real team names and photos here." />
          <div className="team-grid">
            {team.map((m) => (
              <div className="team-card" key={m.name}>
                <div className="team-avatar" aria-hidden="true">{m.initials}</div>
                <h3>{m.name}</h3>
                <span className="role">{m.role}</span>
                <p>{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHeading eyebrow="Inside the café" title="A Space to Linger" />
          <div className="photo-trio">
            <SmartImage name="interior3" alt="Cosy seating area" w={800} h={900} />
            <SmartImage name="coffee3" alt="Latte on a café table" w={500} h={640} />
            <SmartImage name="dessert1" alt="Chocolate dessert" w={500} h={640} />
          </div>
        </div>
      </section>
    </>
  );
}
