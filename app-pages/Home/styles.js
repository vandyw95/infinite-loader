import styled from 'styled-components';
import {
  Card as AntdCard,
  Tooltip as AntdTooltip,
  Typography as AntdTypography,
  Statistic as AntdStatistic,
  Icon as AntdIcon
} from 'antd';

export const PageWrapper = styled.div``;

export const ListWrapper = styled.div`
  padding-top: 5px;
  @media (min-width: 450px) {
    padding-top: 25px;
  }
`;

export const RepoCardWrapper = styled.div`
  padding: 5px 8px;
  @media (min-width: 450px) {
    padding: 5px 25px;
  }
`;

export const RepoCard = styled(AntdCard).attrs({ hoverable: true })`
  border-radius: 6px;
  cursor: default;
  &div,
  .ant-card-body {
    padding: 14px;
  }
`;

export const Tooltip = styled(AntdTooltip)``;

export const RepoName = styled(AntdTypography.Title).attrs({
  level: 4,
  ellipsis: { rows: 1, expandable: false }
})`
  margin-bottom: 5px !important;
`;

export const RepoDescription = styled(AntdTypography.Paragraph).attrs({
  ellipsis: { rows: 1, expandable: false }
})`
  margin-bottom: 5px !important;
`;

export const StatWrapper = styled.div`
  display: flex;
`;

export const StatCol = styled.div`
  min-width: 80px;
  font-size: 14px;
`;

export const StatValue = styled(AntdStatistic)`
  display: inline-block;
  &div,
  .ant-statistic-content {
    font-size: 14px;
  }
`;

const StatIcon = styled(AntdIcon)`
  margin-right: 10px;
`;

export const StarIcon = styled(StatIcon).attrs({
  type: 'star',
  theme: 'twoTone',
  twoToneColor: '#f4d80c'
})``;

export const ForkIcon = styled(StatIcon).attrs({
  type: 'fork'
})``;

export const LanguageIcon = styled(StatIcon).attrs({
  type: 'file-text'
})``;
