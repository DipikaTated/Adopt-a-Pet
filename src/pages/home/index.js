import React, { useEffect, useState } from 'react';
import { getPets, getPetTypes } from '../../api/petfinder';
import Hero from '../../components/hero';
import Pet from '../../components/pet';
import { useParams, Link } from 'react-router-dom';

const HomePage = () => {
  const [data, setData] = useState(null);
  const [petTypes, setPetTypes] = useState([]);
  const { type } = useParams();

  useEffect(() => {
    async function loadPageData() {
      const [pets, types] = await Promise.all([getPets(type), getPetTypes()]);
      setData(pets);
      setPetTypes(types.types || []);
    }
    loadPageData();
  }, [type]);

  if (!data) return <main className="loading-state">Finding your future best friend…</main>;

  return (
    <main className="page home-page">
      {!type && <Hero />}
      {type && <div className="listing-banner"><span className="eyebrow">Your next best friend</span><h1>Meet our {type}s</h1><p>Big hearts come in every shape and size.</p></div>}
      <section className="section pets-section" id="pets">
        <div className="section-heading"><div><span className="eyebrow">Good things are waiting</span><h2>{type ? `${type}s looking for love` : 'Pets looking for love'}</h2><p>Meet a few of the lovely faces hoping to meet you.</p></div><span className="heading-doodle" aria-hidden="true">♡</span></div>
        {data.length ? <div className="grid">{data.slice(0, type ? data.length : 8).map((animal) => <Pet animal={animal} key={animal.id} />)}</div> : <p className="empty-state">No {type || 'pets'} found right now. Try another category soon!</p>}
        {!type && <div className="center-action"><a className="button button-outline" href="#categories">Explore all friends <span aria-hidden="true">→</span></a></div>}
      </section>
      {!type && <>
        <section id="categories" className="section category-section"><div className="section-heading centered-heading"><span className="eyebrow">Who will you fall for?</span><h2>Love comes in every shape</h2><p>Pick your kind of companion and see who is waiting.</p></div>
          <div className="category-grid">{petTypes.map((item, index) => { const path = item._links?.self?.href?.split('/').pop() || item.name.toLowerCase(); const photos = { dog: '/animal-photos/dogs/29582994.jpg', cat: '/animal-photos/cats/29020872.jpg', rabbit: '/animal-photos/rabbits/19613749.jpg', bird: '/animal-photos/birds/7792825.jpg' }; const emoji = { dog: '🐶', cat: '🐱', rabbit: '🐰', bird: '🐦' }[path] || '🐾'; const photo = photos[path]; return <Link to={`/${path}`} className={`category-card category-${index % 4}`} key={item.name}>{photo ? <img className="category-photo" src={photo} alt="" /> : <span className="category-emoji" aria-hidden="true">{emoji}</span>}<strong>{item.name}s</strong><span>Meet your match <b aria-hidden="true">→</b></span></Link>; })}</div>
        </section>
        <section className="about-band" id="about"><div className="about-illustration" aria-hidden="true">🐕</div><div><span className="eyebrow">A home for every heart</span><h2>More than a match.<br />A whole new family.</h2><p>We believe every animal deserves safety, kindness, and a person who loves them for exactly who they are. Let’s help good hearts find each other.</p><a href="#pets" className="text-link">Find your forever friend <span aria-hidden="true">→</span></a></div></section>
        <section className="help-strip"><span aria-hidden="true">✿</span><p>Adoption is a promise of patience, care, and a lifetime of belly rubs.</p><span aria-hidden="true">✿</span></section>
      </>}
      <footer className="site-footer"><Link to="/" className="brand footer-brand"><span className="brand-mark" aria-hidden="true">🐾</span><span><strong>Pawfect</strong><small>HOME</small></span></Link><p>Little paws. Big love. Happily ever after.</p><Link to="/about">Our mission</Link><Link to="/contact">Contact</Link><a href="#pets">Meet the pets</a><span className="footer-copy">Made with ♡ for pets everywhere</span></footer>
    </main>
  );
};

export default HomePage;
