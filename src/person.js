// Who the site is about. Shared by home (ProfilePage) and posts (author) JSON-LD.
export const person = {
  '@type': 'Person',
  '@id': 'https://rezanobakht.dev/#person',
  name: 'Reza Nobakht',
  alternateName: 'رضا نوبخت',
  url: 'https://rezanobakht.dev/',
  image: 'https://rezanobakht.dev/reza.jpg',
  jobTitle: 'CTO',
  description: 'CTO and backend engineer: Laravel/PHP at scale, payments infrastructure, and LLM features in production.',
  knowsAbout: ['Laravel', 'PHP', 'Payments', 'Backend engineering', 'Infrastructure', 'Cloudflare', 'LLM agents', 'RAG', 'AI in production'],
  address: { '@type': 'PostalAddress', addressLocality: 'Shiraz', addressCountry: 'IR' },
  sameAs: ['https://www.linkedin.com/in/reza-nobakht', 'https://github.com/rezanobakht669'],
};
