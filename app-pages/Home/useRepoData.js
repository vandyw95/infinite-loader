import { useState, useEffect } from 'react';

import { fetchGithubRepos } from './helpers';

import { BASE_QUERY, LOADED, LOADING } from './constants';

/**
 * A hook to provide fetching function and data.
 * Also fetching more by indexing for infinite loader component.
 * Receive param of base repos and base total availabe repo
 * @param {Object} param Param Object
 * @param {Object} param.baseRepos An Array of repo object
 * @param {number} param.baseTotalCount Total number of available repo
 * @returns {Object} An Object with hooked data
 */
function useRepoData({ baseRepos, baseTotalCount }) {
  const [repos, setRepos] = useState(baseRepos);
  const [loadedRepoMap, setRepoMap] = useState({});
  const [totalCount, setTotalCount] = useState(baseTotalCount);
  const [currentPage, setCurrentPage] = useState(BASE_QUERY.page);
  const [isLoading, setLoadingStatus] = useState(false);
  const [currentStartIndex, setStartIndex] = useState(0);
  const [currentStopIndex, setStopIndex] = useState(9);

  /**
   * Set repo map loaded status for each repo by index
   */
  const setMapStatus = ({ startIndex, stopIndex, status }) => {
    let newRepoMap = {};
    for (let i = startIndex; i <= stopIndex; i++) {
      newRepoMap[i] = status;
    }
    setRepoMap(prev => ({ ...prev, ...newRepoMap }));
  };

  /**
   * Fetch data from github for repositories
   * Apply loading state before fetching
   * then merge fetched repos with current
   * and set repo map for loaded status along with new total
   * and finally set loading state back to false
   */
  const fetchData = async () => {
    setLoadingStatus(true);

    const {
      totalCount: newTotalCount,
      repos: newRepos
    } = await fetchGithubRepos({
      ...BASE_QUERY,
      page: currentPage
    });

    setRepos(prev => [...prev, ...newRepos]);
    setMapStatus({
      startIndex: currentStartIndex,
      stopIndex: currentStopIndex,
      status: LOADED
    });
    setTotalCount(newTotalCount);
    setLoadingStatus(false);
  };

  /**
   * Handle load more in infinite scroller by catching and set start and stop index.
   * Mainly ust set index (and optimistic loading to repos map) and current page
   * @param {number} startIndex Start index for loading more data
   * @param {number} stopIndex Stop index on loading more data
   */
  const handleLoadMore = (startIndex, stopIndex) => {
    if (!isLoading) {
      setStartIndex(startIndex);
      setStopIndex(stopIndex);
      setMapStatus({ startIndex, stopIndex, status: LOADING });
      setCurrentPage(currentPage + 1);
    }
  };

  // On mounted effect
  /**
   * useEffect hook for on mounted
   * Fetch intial data if not fetched yet
   * If initial data (baseRepos) loaded, set repo map loaded status
   */
  useEffect(() => {
    if (!repos && !totalCount) {
      fetchData();
    } else if (repos.length) {
      setMapStatus({
        startIndex: currentStartIndex,
        stopIndex: currentStopIndex,
        status: LOADED
      });
    }
  }, []);

  /**
   * useEffect hook for watching "currentPage"
   * Do fetching of another page watching changes on "currentPage"
   */
  useEffect(() => {
    // Dont fetch on mount (since data has being fetched)
    // Fetching on mount handled by another effect!
    if (!!repos && !!totalCount && currentPage !== 1) {
      fetchData();
    }
  }, [currentPage]);

  return {
    repos,
    loadedRepoMap,
    setRepoMap,
    totalCount,
    currentPage,
    isLoading,
    handleLoadMore
  };
}

export default useRepoData;
