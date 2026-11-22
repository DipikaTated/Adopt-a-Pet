import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const AdoptionPage = () => {
  const [params] = useSearchParams();
  const petName = params.get('pet') || '';
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.currentTarget).entries());
    const applications = JSON.parse(localStorage.getItem('pawfectApplications') || '[]');
    applications.push({ ...formData, submittedAt: new Date().toISOString() });
    localStorage.setItem('pawfectApplications', JSON.stringify(applications));
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return <main className="form-page"><section className="form-intro"><span className="eyebrow">A lovely first step</span><h1>Let’s find the right fit.</h1><p>Tell us a little about yourself so we can start a conversation about bringing a new friend home.</p></section>
    {submitted ? <section className="success-card" role="status"><span aria-hidden="true">♡</span><h2>Your application is saved!</h2><p>This demo stores applications in this browser only. Pawfect Home has no shelter server, so no real adoption request was sent.</p><Link to="/" className="button">Back to the pets</Link></section> :
      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-grid"><label>Applicant name<input name="name" autoComplete="name" required /></label><label>Email address<input name="email" type="email" autoComplete="email" required /></label><label>Phone number<input name="phone" type="tel" autoComplete="tel" required /></label><label>Pet you’re interested in<input name="pet" defaultValue={petName} required /></label>
          <label className="field-wide">Your living arrangement<select name="livingArrangement" required defaultValue=""><option value="" disabled>Select one</option><option>House with a yard</option><option>House without a yard</option><option>Apartment or shared home</option></select></label>
          <label className="field-wide">Have you cared for pets before?<textarea name="experience" rows="3" placeholder="Tell us about your experience" /></label><label className="field-wide">Why would you like to adopt?<textarea name="reason" rows="4" required /></label></div>
        <p className="form-note">Demo only: your responses are saved in localStorage on this device, not sent to a shelter.</p><button className="button" type="submit">Save my application <span aria-hidden="true">→</span></button>
      </form>}
  </main>;
};

export default AdoptionPage;
