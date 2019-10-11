import fetch from 'isomorphic-unfetch';

/**
 * Construct url with provided query
 * @param {Object} param An Object param
 * @param {String} param.base Base url
 * @param {String} param.query Query object
 * @returns {String} Return constructed url with query string
 */
export function getUrl({ base = '', query = {} } = {}) {
  if (!base) throw Error('No base url found!');
  const queryString = Object.entries(query)
    .map(([k, v]) => `${k}=${v}`)
    .join('&');
  return `${base}?${queryString}`;
}

/**
 * An isomorphic-unfetch for fetching github data
 * from REST API v3 in JSON format
 * @param {String} url Url string
 * @returns {Object} Object data
 */
export async function fetchGithubRestV3(url = '') {
  try {
    return await fetch(url, {
      headers: { Accept: 'application/vnd.github.v3+json' }
    }).then(r => r.json());
  } catch (err) {
    console.error(err);
    return {};
  }
}
