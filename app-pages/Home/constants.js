// Base url for searching repositories on github
export const BASE_URL = 'https://api.github.com/search/repositories';

// Base query for searching repositories on github
export const BASE_QUERY = {
  q: 'is:public+stars:>1',
  sort: 'stars',
  order: 'desc',
  per_page: 10,
  page: 1
};

export const LOADING = 'loading';

export const LOADED = 'loaded';

export const DEFAULT_VALUE = {
  REPO: {
    LOADING_TITLE: 'Loading',
    PAGE_URL: undefined,
    NAME: 'Untitled Repository',
    DESCRIPTION: 'No description given',
    STAR_COUNT: 0,
    FORK_COUNT: 0,
    LANGUAGE: 'N/A',
    TOOLTIP_STAR: 'Total Stars',
    TOOLTIP_FORK: 'Total Forks',
    TOOLTIP_LANGUAGE: "Repo's Language"
  }
};
