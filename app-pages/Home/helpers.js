import { getUrl, fetchGithubRestV3 } from 'fetch';

import { BASE_URL, DEFAULT_VALUE } from './constants';

const { REPO } = DEFAULT_VALUE;

/**
 * Generate a query date for searching github repositories
 * based on requirement of "created" max 30 days ago
 * @returns {String} String of date in format YYYY-MM-DD
 */
export function getQueryDate() {
  const date = new Date();
  date.setDate(date.getDate() - 30);
  return date.toISOString().split('T')[0];
}

/**
 * A function to modified search query by adding created date
 * @param {Object} query A Query Obejct for searching on github
 * @returns {Object} Query object with query modified with created date
 */
export function addDateQuery(query = {}) {
  const modifiedQuery = `${query.q}+created:>${getQueryDate()}`;
  return { ...query, q: escape(modifiedQuery) };
}

/**
 * A function for cleaning unused repo object key & value
 * @param {Array} repos An array of fetched github repo object
 * @returns {Array} Array of cleaned object required in this view
 */
export function getCleanedRepos(repos = []) {
  return repos.map(
    ({
      id,
      html_url,
      name,
      description,
      stargazers_count,
      forks_count,
      language
    }) => ({
      id,
      pageUrl: html_url || REPO.PAGE_URL,
      name: name || REPO.NAME,
      description: description || REPO.DESCRIPTION,
      starCount: stargazers_count || REPO.STAR_COUNT,
      forkCount: forks_count || REPO.FORK_COUNT,
      language: language || REPO.LANGUAGE
    })
  );
}

/**
 * A fect function tailored for fetching github's repos & clean them
 * @param {String} query Query object for fetching
 * @returns {Array} Array of repo object
 */
export async function fetchGithubRepos(query = {}) {
  return await fetchGithubRestV3(
    getUrl({ base: BASE_URL, query: addDateQuery(query) })
  ).then(({ total_count, items }) => ({
    totalCount: total_count,
    repos: getCleanedRepos(items)
  }));
}
