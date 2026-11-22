import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => <main className="info-page">
  <section className="info-hero about-hero"><span className="eyebrow">A home for every heart</span><h1>Good things happen<br />when we find each other.</h1><p>Pawfect Home is a student-built adoption website inspired by one simple idea: every pet deserves a safe, loving home.</p><span className="info-paw" aria-hidden="true">🐕</span></section>
  <section className="info-columns"><article><span aria-hidden="true">♡</span><h2>Our mission</h2><p>Make it easier for people to meet adoptable animals and learn about the care and commitment that come with adoption.</p></article><article><span aria-hidden="true">✿</span><h2>Why adoption matters</h2><p>Choosing adoption can give an animal a fresh start and help shelters make room for pets who need care.</p></article><article><span aria-hidden="true">✦</span><h2>Our little goal</h2><p>Bring kind people and wonderful pets together, one thoughtful introduction at a time.</p></article></section>
  <div className="center-action"><Link to="/" className="button">Meet the pets <span aria-hidden="true">→</span></Link></div>
</main>;

export default AboutPage;
