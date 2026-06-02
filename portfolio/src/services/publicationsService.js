import axios from 'axios';
import { PUBLICATIONS } from '@/constants.js';

const ORCID_WORKS_URL = 'https://pub.orcid.org/v3.0/0000-0003-4148-5991/works';
const SESSION_KEY = 'publications';

function getMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  return date.toLocaleString('en-US', { month: 'long' });
}

function getFormattedDate(publicationDate) {
  if (!publicationDate) return 'Unknown date';

  let dateStr = '';
  if (publicationDate['month'] && publicationDate['month'].value) {
    dateStr += getMonthName(publicationDate['month'].value) + ' ';
  }

  if (publicationDate['year'] && publicationDate['year'].value) {
    dateStr += publicationDate['year'].value;
  } else {
    dateStr = dateStr.trim() || 'Unknown date';
  }

  return dateStr;
}

export function parsePublicationDate(pub) {
  const dateStr = pub.date || '';
  if (dateStr === 'Unknown date') return 0;

  const parts = dateStr.trim().split(/\s+/);
  if (parts.length === 1 && /^\d{4}$/.test(parts[0])) {
    return new Date(parseInt(parts[0], 10), 0, 1).getTime();
  }

  const parsed = Date.parse(dateStr);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function sortPublicationsByDateDesc(publications) {
  return [...publications].sort(
    (a, b) => parsePublicationDate(b) - parsePublicationDate(a)
  );
}

export function getLatestPublications(publications, limit = 2) {
  return sortPublicationsByDateDesc(publications).slice(0, limit);
}

async function fetchFromOrcid() {
  const publications = {};
  const response = await axios.get(ORCID_WORKS_URL);
  const works = response.data.group;

  for (let i = 0; i < works.length; i++) {
    try {
      const work = (
        await axios.get('https://pub.orcid.org/v3.0' + works[i]['work-summary'][0]['path'])
      ).data;
      let contributors = '';

      if (work.contributors && work.contributors.contributor) {
        for (let e = 0; e < work.contributors.contributor.length; e++) {
          const contributor = work.contributors.contributor[e];
          if (contributor['credit-name'] && contributor['credit-name'].value) {
            contributors += contributor['credit-name'].value + ', ';
          }
        }
        contributors = contributors ? contributors.slice(0, contributors.length - 2) : '';
      }

      if (work['url'] && work['url'].value) {
        publications[work['url'].value] = {
          title:
            work['title'] && work['title']['title']
              ? work['title']['title'].value
              : 'Untitled',
          authors: contributors || 'Unknown authors',
          date: getFormattedDate(work['publication-date']),
          link: work['url'].value,
          conference:
            work['journal-title'] && work['journal-title'].value
              ? work['journal-title'].value
              : 'Unknown venue'
        };
      }
    } catch (error) {
      console.error('Error processing work:', error);
    }
  }

  for (let i = 0; i < PUBLICATIONS.length; i++) {
    const pub = PUBLICATIONS[i];
    if (pub['doi'] && publications[pub['doi']]) {
      if (pub['abstract']) publications[pub['doi']]['abstract'] = pub['abstract'];
      if (pub['pdf']) publications[pub['doi']]['pdf'] = pub['pdf'];
      if (pub['badges']) publications[pub['doi']]['badges'] = pub['badges'];
    }
  }

  return sortPublicationsByDateDesc(Object.values(publications));
}

export async function fetchPublications(session) {
  if (session && session.get(SESSION_KEY)) {
    return session.get(SESSION_KEY);
  }

  const publications = await fetchFromOrcid();

  if (session) {
    session.set(SESSION_KEY, publications);
  }

  return publications;
}
