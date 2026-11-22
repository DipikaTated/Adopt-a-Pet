import React, { useEffect, useState } from 'react';
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const Search = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState(searchParams.get('name') || '');

  useEffect(() => {
    setValue(searchParams.get('name') || '');
  }, [location.pathname, searchParams]);

  const onSearchHandler = (event) => {
    event.preventDefault();
    const query = createSearchParams({ name: value.trim() });
    navigate({ pathname: '/search', search: `?${query}` });
  };

  return (
    <form onSubmit={onSearchHandler} className="search-form" role="search">
      <input aria-label="Search pets by name, type, breed, or age" type="search" className="search" placeholder="Find a friend…" value={value} onChange={(event) => setValue(event.target.value)} />
      <button type="submit" className="search-button" aria-label="Search pets">⌕</button>
    </form>
  );
};

export default Search;
