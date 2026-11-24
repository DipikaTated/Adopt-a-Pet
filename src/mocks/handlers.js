import { rest } from 'msw';
import types from './data/types.json';
import animals from './data/animals.json';
import details from './data/details.json';
import communityPets from './data/communityPets.json';
import petOverrides from './data/petOverrides.json';

const applyPetOverride = (animal) => {
  const override = petOverrides[animal.id];
  if (!override) return animal;
  const { breed, photo, ...otherChanges } = override;
  return {
    ...animal,
    ...otherChanges,
    breeds: breed ? { ...animal.breeds, primary: breed } : animal.breeds,
    photos: photo ? [{ medium: photo, large: photo, full: photo }] : animal.photos
  };
};

export const handlers = [
  rest.get('/types', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(types));
  }),
  rest.get('/animals', (req, res, ctx) => {
    const type = (req.url.searchParams.get('type') || '').trim().toLowerCase();
    const query = (req.url.searchParams.get('query') || '').trim().toLocaleLowerCase();
    let response = [...animals.animals.map(applyPetOverride), ...communityPets.map((animal) => ({ ...animal, demoOnly: true }))];

    const includesQuery = (value) => String(value || '').toLocaleLowerCase().includes(query);
    if (type) response = response.filter((animal) => String(animal.type || '').trim().toLowerCase() === type);
    if (query) {
      // People naturally search for plural names and familiar baby-animal words
      // ("cats", "puppies", "bunnies"). Match those against the singular type
      // stored in the pet records as well as the usual name/breed fields.
      const animalTypeAliases = {
        dogs: ['dog', 'puppy', 'puppies'],
        puppies: ['dog', 'puppy', 'puppies'],
        cats: ['cat', 'kitten', 'kittens'],
        kittens: ['cat', 'kitten', 'kittens'],
        rabbits: ['rabbit', 'bunny', 'bunnies'],
        bunnies: ['rabbit', 'bunny', 'bunnies'],
        birds: ['bird'],
        other: ['scales, fins & other', 'other']
      };
      const typeAliases = animalTypeAliases[query];
      response = response.filter((animal) => {
      const searchableValues = [
        animal.name,
        animal.type,
        animal.age,
        animal.gender,
        animal.breeds?.primary,
        animal.breeds?.secondary,
        animal.colors?.primary,
        animal.description,
        animal.contact?.address?.city,
        animal.contact?.address?.state,
        animal.contact?.address?.postcode,
        ...(animal.tags || [])
      ];
        const searchableText = searchableValues.map((value) => String(value || '').toLocaleLowerCase()).join(' ');
        if (typeAliases) {
          const type = String(animal.type || '').toLocaleLowerCase();
          return typeAliases.some((alias) => type === alias || searchableText.includes(alias));
        }
        return searchableValues.some(includesQuery);
      });
    }
    return res(ctx.status(200), ctx.json(response));
  }),
  rest.get('/animals/:id', (req, res, ctx) => {
    const { id } = req.params;
    const listedPet = animals.animals.find((animal) => String(animal.id) === String(id));
    const communityPet = communityPets.find((animal) => String(animal.id) === String(id));
    // Use the detailed record when available; otherwise fall back to the same
    // pet record used by the listing so every displayed pet has a detail page.
    let response = details[id]
      ? applyPetOverride(details[id])
      : listedPet
        ? applyPetOverride(listedPet)
        : communityPet
          ? { ...communityPet, demoOnly: true }
          : undefined;

    if (!response) {
      return res(ctx.status(404));
    }

    return res(ctx.status(200), ctx.json(response));
  })
];
