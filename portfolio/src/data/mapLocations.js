export const MAP_LOCATIONS = [
  {
    id: 'abrantes',
    name: 'Abrantes',
    description: 'July 2022',
    visited: '2022-07',
    position: [39.449231, -8.192028],
    photos: ['/photos/Abrantes.webp'],
    captions: ['Ponte Rodoviária de Abrantes']
  },
  {
    id: 'trondheim',
    name: 'Trondheim',
    description: 'June 2025',
    visited: '2025-06',
    position: [63.3739150644068, 10.781664797055672],
    photos: ['/photos/Trondheim.webp'],
    captions: ['Storfossen']
  },
  {
    id: 'paris',
    name: 'Paris',
    description: 'February 2025',
    visited: '2025-02',
    position: [48.87275403106653, 2.7764030386937617],
    photos: ['/photos/Disneyland.webp'],
    captions: ['Disneyland Paris']
  },
  {
    id: 'pisoes-de-teresa',
    name: 'Pisões de Teresa',
    description: 'August 2025',
    visited: '2025-08',
    position: [40.04637820301593, -8.187552594828766],
    photos: ['/photos/Pisoes.webp'],
    captions: ['Pisões de Teresa']
  },
  {
    id: 'iceland',
    name: 'Iceland',
    description: 'April 2024',
    visited: '2024-04',
    position: [65.68294972706724, -17.550222525608977],
    photos: ['/photos/Iceland.webp'],
    captions: ['Goðafoss']
  }
];

export function getLocationById(id) {
  return MAP_LOCATIONS.find((location) => location.id === id);
}

export function getMapPhotosLink(locationId, photoIndex = 0) {
  const params = new URLSearchParams({ location: locationId });
  if (photoIndex > 0) {
    params.set('photo', String(photoIndex));
  }
  return `#/map-photos?${params.toString()}`;
}

export function getLatestPhotos(locations, limit = 4) {
  const sorted = [...locations].sort((a, b) => b.visited.localeCompare(a.visited));
  const photos = [];

  for (const location of sorted) {
    for (let i = 0; i < location.photos.length; i++) {
      photos.push({
        src: location.photos[i],
        locationId: location.id,
        photoIndex: i,
        locationName: location.name,
        caption: location.captions && location.captions[i] ? location.captions[i] : location.name,
        visited: location.visited,
        mapLink: getMapPhotosLink(location.id, i)
      });
      if (photos.length >= limit) {
        return photos;
      }
    }
  }

  return photos;
}
