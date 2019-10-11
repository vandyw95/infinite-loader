import { createGlobalStyle } from 'styled-components';

const FONT_FAMILY = `"Helvetica Neue", Helvetica, Arial, sans-serif,
  "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
  "Chinese Quote", -apple-system, BlinkMacSystemFont,
  "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei"`;

const GlobalStyles = createGlobalStyle`
  body {
    font-family: ${FONT_FAMILY};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export default GlobalStyles;
