import React, { useEffect, useState } from 'react';
import { getPetTypes } from '../../api/petfinder';
import Search from '../search';

// Import NavLink
import { NavLink, Link } from 'react-router-dom';

const Navigation = () => {
  const [petTypes, setPetTypes] = useState([]);

  useEffect(() => {
    async function getPetTypesData() {
      const { types } = await getPetTypes();
      setPetTypes(types);
    }

    getPetTypesData();
  }, []);

  return (
    <header className="site-header">
      <div className="nav-logo">
        <Link to="/" className="brand"><span className="brand-mark" aria-hidden="true">🐾</span><span><strong>Pawfect</strong><small>HOME</small></span></Link>
        <Search />
      </div>
      <ul className="nav-links">
        <li key={'all'}>
          {/* These links should be NavLink component and add a special active class name if its an active link */}
          <NavLink 
            to="/"
            className={ ({isActive}) => `nav-link ${isActive ? 'nav-link-active' : '' }`}
          >
            All friends
          </NavLink>
        </li>
        {petTypes
          ? petTypes.map((type) => (
              <li key={type.name}>
                {/* These links should be NavLink component and add a special active class name if its an active link */}
                <NavLink to={`/${type._links.self.href.split('/').pop()}`}
                  key={type.name}
                  className={ ( {isActive} ) => `nav-link ${ isActive ? 'nav-link-active' : '' }`}               
                >
                  {type.name}s
                </NavLink>{' '}
              </li>
            ))
          : 'Loading...'}
        <li><NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>Our story</NavLink></li>
        <li><NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>Contact</NavLink></li>
      </ul>
    </header>
  );
};

export default Navigation;
