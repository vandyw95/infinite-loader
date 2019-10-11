import PropTypes from 'prop-types';

import useRepoData from './useRepoData';
import { fetchGithubRepos } from './helpers';

import RepoList from './RepoList';

import { PageWrapper } from './styles';

import { BASE_QUERY } from './constants';

function Home({ baseTotalCount, baseRepos }) {
  const data = useRepoData({ baseTotalCount, baseRepos });

  return (
    <PageWrapper>
      <RepoList {...data} />
    </PageWrapper>
  );
}

Home.propTypes = {
  baseTotalCount: PropTypes.number,
  baseRepos: PropTypes.array
};

Home.defaultProps = {
  baseTotalCount: undefined,
  baseRepos: undefined
};

Home.getInitialProps = async () => {
  const {
    totalCount: baseTotalCount,
    repos: baseRepos
  } = await fetchGithubRepos(BASE_QUERY);

  return { baseTotalCount, baseRepos };
};

export default Home;
