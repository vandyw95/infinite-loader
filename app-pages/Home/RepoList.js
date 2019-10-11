import PropTypes from 'prop-types';
import InfiniteLoader from 'react-window-infinite-loader';
import { FixedSizeList } from 'react-window';

import RepoListItem from './RepoListItem';

import { ListWrapper, RepoCardWrapper } from './styles';

import { LOADED } from './constants';

function RepoList({ repos, loadedRepoMap, totalCount, handleLoadMore }) {
  /**
   * Placeholder on empty
   * Intended to be shown on error (since error returned empty)
   */
  if (!repos.length) {
    return (
      <RepoListItem
        name="Fetch error!"
        description="Github fetch rate limit exceeded! Try again later."
      />
    );
  }

  const hasNextPage = totalCount - repos.length > 0;
  const itemCount = hasNextPage ? repos.length + 11 : repos.length;

  /**
   * Check if current rendered item has been loaded or not
   * @param {number} index Index of current rendered item
   * @returns {boolean}
   */
  const isItemLoaded = index => !!loadedRepoMap[index];

  /**
   * Function for rendering repos list item component
   * @param {Object} param Receive Obect as param
   * @param {number} param.index index of current rendered item
   * @param {Object} param.style style for current rendered item (from react-window) to virtualize list items
   * @returns List item component
   */
  const renderItem = ({ index, style }) => {
    const repo = loadedRepoMap[index] === LOADED && repos[index];

    if (!repo) {
      return (
        <RepoCardWrapper key={index} style={style}>
          <RepoListItem isLoading />
        </RepoCardWrapper>
      );
    }

    return (
      <RepoCardWrapper key={repo.id} style={style}>
        <RepoListItem {...repo} index={index} />
      </RepoCardWrapper>
    );
  };

  return (
    <ListWrapper>
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={handleLoadMore}
      >
        {({ onItemsRendered, ref }) => (
          <FixedSizeList
            ref={ref}
            overscanCount={3}
            itemCount={itemCount}
            onItemsRendered={onItemsRendered}
            height={1230}
            itemSize={123}
            width="100%"
          >
            {renderItem}
          </FixedSizeList>
        )}
      </InfiniteLoader>
    </ListWrapper>
  );
}

RepoList.propTypes = {
  repos: PropTypes.array,
  loadedRepoMap: PropTypes.object,
  totalCount: PropTypes.number,
  handleLoadMore: PropTypes.func.isRequired
};

RepoList.defaultProps = {
  repos: [],
  loadedRepoMap: {},
  totalCount: 0
};

export default RepoList;
