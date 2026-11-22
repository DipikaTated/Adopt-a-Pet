import React, { useState, useEffect } from 'react';
import { getPets } from '../../api/petfinder';
import Pet from '../../components/pet';
import { useSearchParams } from 'react-router-dom';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get('name') || '').trim();
  const [pets, setPets] = useState([]);
  const [type, setType] = useState('');
  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('');
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let current = true;
    setLoading(true);
    setHasError(false);
    getPets('', query)
      .then((results) => { if (current) setPets(results); })
      .catch(() => { if (current) setHasError(true); })
      .finally(() => { if (current) setLoading(false); });
    return () => { current = false; };
  }, [query]);

  const results = pets.filter((pet) =>
    (!type || pet.type?.toLowerCase() === type.toLowerCase()) &&
    (!age || pet.age === age) &&
    (!breed || pet.breeds?.primary?.toLowerCase().includes(breed.toLowerCase()))
  );

  return <main className="page search-page">
    <section className="listing-banner"><span className="eyebrow">A good match is out there</span><h1>Search results</h1><p>{query ? `Showing matches for “${query}”.` : 'Browse all friends in our demo pet directory.'}</p></section>
    <section className="section"><div className="filter-panel"><label>Animal type<select value={type} onChange={(event) => setType(event.target.value)}><option value="">All animals</option><option value="Dog">Dogs</option><option value="Cat">Cats</option><option value="Rabbit">Rabbits</option><option value="Bird">Birds</option><option value="Scales, Fins & Other">Other pets</option></select></label><label>Age<select value={age} onChange={(event) => setAge(event.target.value)}><option value="">Any age</option>{[...new Set(pets.map((pet) => pet.age).filter(Boolean))].sort().map((item) => <option key={item}>{item}</option>)}</select></label><label>Breed<input value={breed} onChange={(event) => setBreed(event.target.value)} placeholder="e.g. Labrador" /></label></div>
      <div className="section-heading search-results-title"><div><span className="eyebrow">Your search</span><h2>{loading ? 'Looking for matches…' : `${results.length} ${results.length === 1 ? 'friend' : 'friends'} to meet`}</h2></div></div>
      {hasError ? <p className="empty-state" role="alert">Search is temporarily unavailable. Please try again in a moment.</p> : loading ? <p className="empty-state" aria-live="polite">Finding pets that match…</p> : results.length ? <div className="grid">{results.map((pet) => <Pet animal={pet} key={pet.id} />)}</div> : <p className="empty-state">No pets match those filters yet. Try a different name or filter.</p>}
    </section>
  </main>;
};

export default SearchPage;
