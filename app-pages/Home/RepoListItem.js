import PropTypes from 'prop-types';

import {
  RepoCard,
  Tooltip,
  RepoName,
  RepoDescription,
  StatWrapper,
  StatCol,
  StatValue,
  StarIcon,
  ForkIcon,
  LanguageIcon
} from './styles';

import { DEFAULT_VALUE } from './constants';

const { REPO } = DEFAULT_VALUE;

function RepoListItem({
  isLoading,
  url,
  index,
  name,
  description,
  starCount,
  forkCount,
  language
}) {
  return (
    <RepoCard>
      <RepoName>
        {isLoading ? REPO.LOADING_TITLE : `#${index + 1} ${name}`}
      </RepoName>

      <RepoDescription>{isLoading ? '-' : description}</RepoDescription>

      <StatWrapper>
        <Tooltip placement="bottomLeft" title={REPO.TOOLTIP_STAR}>
          <StatCol>
            <StarIcon />
            {isLoading ? '-' : <StatValue value={starCount} />}
          </StatCol>
        </Tooltip>

        <Tooltip placement="bottomLeft" title={REPO.TOOLTIP_FORK}>
          <StatCol>
            <ForkIcon />
            {isLoading ? '-' : <StatValue value={forkCount} />}
          </StatCol>
        </Tooltip>

        <Tooltip placement="bottomRight" title={REPO.TOOLTIP_LANGUAGE}>
          <StatCol>
            <LanguageIcon />
            {isLoading ? '-' : language}
          </StatCol>
        </Tooltip>
      </StatWrapper>
    </RepoCard>
  );
}

RepoListItem.propTypes = {
  isLoading: PropTypes.bool,
  url: PropTypes.string,
  index: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  starCount: PropTypes.number,
  forkCount: PropTypes.number,
  language: PropTypes.string
};

RepoListItem.defaultProps = {
  isLoading: false,
  url: REPO.PAGE_URL,
  index: undefined,
  name: REPO.NAME,
  description: REPO.DESCRIPTION,
  starCount: REPO.STAR_COUNT,
  forkCount: REPO.FORK_COUNT,
  language: REPO.LANGUAGE
};

export default RepoListItem;
