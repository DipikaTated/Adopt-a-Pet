import React, { useEffect, useState } from 'react';
import { getPetDetails } from '../../api/petfinder';

// Import useParams
import { useParams, Navigate, Link } from 'react-router-dom';
// Import Navigate

const PetDetailsPage = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const typePhoto = {
    dog: '/animal-photos/dogs/29582994.jpg',
    cat: '/animal-photos/cats/29020872.jpg',
    rabbit: '/animal-photos/rabbits/19613749.jpg',
    bird: '/animal-photos/birds/7792825.jpg'
  };

  useEffect(() => {
    async function getPetsData() {
      try {
        const petsData = await getPetDetails(id);
        setData(petsData);
        setError(false);
      } catch (e) {
        setError(true);
      }
      setLoading(false);
    }

    getPetsData();
  }, [id]);

  return (
    <div>
      {loading ? (
        <h3>Loading...</h3>
      ) : error ? (
        <div>
          {/* Redirect to /pet-details-not-found if there was an error! */}
          <Navigate to='/pet-details-not-found'/>
        </div>
      ) : (
        <main>
          <main className="pet-detail-page">
          <div className="detail-kicker"><Link to="/">← Back to all pets</Link><span className="eyebrow">A new friend is waiting</span></div>
          <div className="pet-detail">
            <div className="pet-image-container">
              <img
                className="pet-image"
                src={data.photos?.[0]?.large || data.photos?.[0]?.medium || typePhoto[data.type?.toLowerCase()] || '/missing-animal.png'}
                onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = typePhoto[data.type?.toLowerCase()] || '/missing-animal.png'; }}
                alt={data.demoOnly ? `Stock photo for sample ${data.type?.toLowerCase() || 'pet'} profile ${data.name}` : `${data.name}, an adoptable ${data.type || 'pet'}`}
              />
            </div>
            <div className="pet-detail-copy">
              <span className="pet-type-tag">{data.type || 'Pet'}</span>
              <h1>{data.name}</h1>
              <p className="detail-lead">{data.breeds?.primary || 'Wonderful mixed breed'} · {data.age || 'Ready to meet you'}{data.gender ? ` · ${data.gender}` : ''}</p>
              <div className="detail-facts"><span>Breed<strong>{data.breeds?.primary || 'Mixed breed'}</strong></span><span>Age<strong>{data.age || 'Not listed'}</strong></span><span>Gender<strong>{data.gender || 'Not listed'}</strong></span></div>
              <h3>A little about {data.name}</h3>
              <p>{data.description || `${data.name} is hoping to meet a caring family.`}</p>
              {data.tags?.length > 0 && <p className="personality"><strong>Personality:</strong> {data.tags.join(', ')}</p>}
              <p className="adoption-note">{data.demoOnly ? 'Demo profile: this stock photo and fictional pet profile do not represent a real shelter animal or actual availability.' : 'Every pet has their own story. Please connect with the listed shelter to learn about their adoption process.'}</p>
              <Link className="button" to={`/adoption-application?pet=${encodeURIComponent(data.name)}`}>{data.demoOnly ? 'Try the demo application' : `I’m interested in ${data.name}`} <span aria-hidden="true">→</span></Link>
            </div>
          </div>
          </main>
        </main>
      )}
    </div>
  );
};

export default PetDetailsPage;
