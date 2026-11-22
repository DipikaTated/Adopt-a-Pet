import React from 'react';

const Hero = ({ image, displayText }) => (
  <section className="hero-container" style={image ? { backgroundImage: `linear-gradient(90deg,rgba(39,44,36,.72),rgba(39,44,36,.08)),url("${image}")` } : undefined}>
    <div className="hero-content">
      <span className="eyebrow"><span aria-hidden="true">✦</span> A little love goes a long way</span>
      <h1>{displayText || <>Find your <em>forever</em> friend.</>}</h1>
      <p>Wonderful pets are waiting for a place to call home. Your new best friend could be one click away.</p>
      <a className="button hero-button" href="#pets">Meet your new best friend <span aria-hidden="true">→</span></a>
      <div className="hero-note"><span aria-hidden="true">♡</span> Every adoption makes room for another rescue.</div>
    </div>
    {!image && <div className="hero-art" aria-hidden="true"><div className="hero-photo"><img src="/pets-hero.png" alt="" /></div><span className="hero-sticker sticker-one">lots of<br />love!</span><span className="hero-sticker sticker-two">♡</span></div>}
  </section>
);

export default Hero;
