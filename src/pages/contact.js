import React, { useState } from 'react';

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return <main className="form-page contact-page"><section className="form-intro"><span className="eyebrow">We’d love to hear from you</span><h1>Say hello.</h1><p>Questions about the project or how adoption works? Send a note using this demo contact form.</p></section>
    <div className="contact-layout"><aside className="contact-card"><h2>Get in touch</h2><p>This is a student project, so the details below are examples.</p><p><strong>Email</strong><br /><a href="mailto:hello@pawfecthome.example">hello@pawfecthome.example</a></p><p><strong>Location</strong><br />Your local animal shelter</p><p className="form-note">No real shelter or inbox is connected.</p></aside>
      {submitted ? <section className="success-card" role="status"><span aria-hidden="true">♡</span><h2>Thanks for your note!</h2><p>This demo confirmed your message in the page only. It was not emailed or sent to a server.</p><button className="button" onClick={() => setSubmitted(false)}>Write another message</button></section> : <form className="form-card" onSubmit={handleSubmit}><div className="form-grid"><label>Your name<input name="name" autoComplete="name" required /></label><label>Email address<input name="email" type="email" autoComplete="email" required /></label><label className="field-wide">Your message<textarea name="message" rows="6" required /></label></div><p className="form-note">Demo only: this form does not send email.</p><button className="button" type="submit">Show confirmation <span aria-hidden="true">→</span></button></form>}
    </div>
  </main>;
};

export default ContactPage;
