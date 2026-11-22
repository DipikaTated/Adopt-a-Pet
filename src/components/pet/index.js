import React from 'react';
import { Link } from 'react-router-dom';

const Pet = ({ animal }) => {
  const typePhoto = {
    dog: '/animal-photos/dogs/29582994.jpg',
    cat: '/animal-photos/cats/29020872.jpg',
    rabbit: '/animal-photos/rabbits/19613749.jpg',
    bird: '/animal-photos/birds/7792825.jpg'
  }[animal.type?.toLowerCase()] || '/missing-animal.png';
  const photo = animal.photos?.[0]?.medium || typePhoto;
  const breed = animal.breeds?.primary || 'Mixed breed';
  const age = animal.age || 'Ready to meet you';
  return (
    <article className="pet-card">
      <Link to={`/${animal.type.toLowerCase()}/${animal.id}`} className="pet-card-link" aria-label={`Meet ${animal.name}`}>
        <div className="pet-image-container"><img className="pet-image" src={photo} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = typePhoto; }} alt={animal.demoOnly ? `Stock photo for sample ${animal.type.toLowerCase()} profile ${animal.name}` : `${animal.name}, an adoptable ${animal.type.toLowerCase()}`} /><span className="pet-heart" aria-hidden="true">♡</span></div>
        <div className="pet-card-body"><span className="pet-type-tag">{animal.type}</span>{animal.demoOnly && <span className="demo-tag">Stock photo</span>}<h3>{animal.name}</h3><p className="pet-breed">{breed}</p><div className="pet-meta"><span>{age}</span>{animal.gender && <span>{animal.gender}</span>}</div><span className="pet-card-cta">Meet {animal.name} <b aria-hidden="true">→</b></span></div>
      </Link>
    </article>
  );
};

export default Pet;
